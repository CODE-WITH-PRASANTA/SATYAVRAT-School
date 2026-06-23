const Student = require("../models/Student/studentAdmission.models");
const Teacher = require("../models/teacher.models");
const FeeEntry = require("../models/Fee/feeEntry.model");
const Expense = require("../models/expense.models");
const News = require("../models/newsposting.models");
const Gallery = require("../models/gallery.models");
const Testimonial = require("../models/testimonial.models");
const Enquiry = require("../models/coldlead.models");

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const endOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const endOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

const getAcademicYear = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 4) {
    return `${year}-${String(year + 1).slice(-2)}`;
  }

  return `${year - 1}-${String(year).slice(-2)}`;
};

const sumField = async (Model, match, field) => {
  const [result] = await Model.aggregate([
    { $match: match },
    { $group: { _id: null, total: { $sum: `$${field}` } } },
  ]);

  return result?.total || 0;
};

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
    : "";

const getMonthlySeries = (items, daysInMonth, dateField, valueField) => {
  const values = Array(daysInMonth).fill(0);

  items.forEach((item) => {
    const date = new Date(item[dateField]);
    const dayIndex = date.getDate() - 1;

    if (dayIndex >= 0 && dayIndex < daysInMonth) {
      values[dayIndex] += Number(item[valueField] || 0);
    }
  });

  return values;
};

exports.getDashboardSummary = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const academicYear = getAcademicYear(now);

    const [
      totalStudents,
      maleStudents,
      femaleStudents,
      staffCount,
      monthlyFeeCollection,
      monthlyExpense,
      todayFeeCollection,
      todayExpense,
      paymentModes,
      classCounts,
      feeEntries,
      expenses,
      birthdays,
      anniversaries,
      notices,
      newsViews,
      newsComments,
      newsCount,
      galleryCount,
      testimonialCount,
      enquiryCount,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ gender: { $regex: /^male$/i } }),
      Student.countDocuments({ gender: { $regex: /^female$/i } }),
      Teacher.countDocuments(),
      sumField(
        FeeEntry,
        { isActive: true, entryDate: { $gte: monthStart, $lte: monthEnd } },
        "paidAmount",
      ),
      sumField(Expense, { date: { $gte: monthStart, $lte: monthEnd } }, "amount"),
      sumField(
        FeeEntry,
        { isActive: true, entryDate: { $gte: todayStart, $lte: todayEnd } },
        "paidAmount",
      ),
      sumField(Expense, { date: { $gte: todayStart, $lte: todayEnd } }, "amount"),
      FeeEntry.aggregate([
        { $match: { isActive: true, entryDate: { $gte: monthStart, $lte: monthEnd } } },
        { $group: { _id: "$paymentMode", total: { $sum: "$paidAmount" } } },
      ]),
      Student.aggregate([
        { $group: { _id: { $ifNull: ["$class", "Unassigned"] }, total: { $sum: 1 } } },
        { $sort: { total: -1, _id: 1 } },
      ]),
      FeeEntry.find({
        isActive: true,
        entryDate: { $gte: monthStart, $lte: monthEnd },
      }).select("entryDate paidAmount"),
      Expense.find({ date: { $gte: monthStart, $lte: monthEnd } }).select("date amount"),
      Student.find({
        dob: { $exists: true, $ne: null },
        $expr: { $eq: [{ $month: "$dob" }, now.getMonth() + 1] },
      })
        .sort({ dob: 1 })
        .limit(4)
        .select("studentName dob studentPhoto"),
      Student.find({
        marriageAnniversary: { $exists: true, $ne: null },
        $expr: { $eq: [{ $month: "$marriageAnniversary" }, now.getMonth() + 1] },
      })
        .sort({ marriageAnniversary: 1 })
        .limit(4)
        .select("studentName marriageAnniversary studentPhoto"),
      News.find({ status: "Active" })
        .sort({ date: -1, createdAt: -1 })
        .limit(10)
        .select("title author date createdAt"),
      sumField(News, {}, "views"),
      sumField(News, {}, "comments"),
      News.countDocuments(),
      Gallery.countDocuments(),
      Testimonial.countDocuments(),
      Enquiry.countDocuments(),
    ]);

    const paymentModeLabels = ["Cash", "Cheque", "Online", "UPI", "DD"];
    const paymentModeMap = paymentModes.reduce((map, item) => {
      map[item._id || "Unknown"] = item.total || 0;
      return map;
    }, {});

    const trafficItems = [
      { label: "News Views", value: newsViews, color: "green" },
      { label: "Enquiries", value: enquiryCount, color: "blue" },
      { label: "Gallery", value: galleryCount, color: "orange" },
      { label: "Comments", value: newsComments, color: "red" },
    ];
    const trafficTotal = trafficItems.reduce((total, item) => total + item.value, 0);

    res.json({
      success: true,
      data: {
        meta: {
          generatedAt: now,
          academicYear,
          monthLabel: now.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          }),
        },
        cards: {
          totalStudents,
          studentPresence: 0,
          monthlyFees: monthlyFeeCollection,
          monthlyIncome: monthlyFeeCollection,
          monthlyExpense,
          staff: staffCount,
          staffPresence: 0,
          totalMale: maleStudents,
          totalFemale: femaleStudents,
          todayFees: todayFeeCollection,
          todayExpense,
        },
        occasions: {
          birthdays: birthdays.map((student) => ({
            name: student.studentName || "Student",
            date: formatDate(student.dob),
            image: student.studentPhoto || "",
          })),
          anniversaries: anniversaries.map((student) => ({
            name: student.studentName || "Student",
            date: formatDate(student.marriageAnniversary),
            image: student.studentPhoto || "",
          })),
          leaves: [],
        },
        earningMode: {
          labels: paymentModeLabels,
          values: paymentModeLabels.map((label) => paymentModeMap[label] || 0),
        },
        classChart: {
          labels: classCounts.map((item) => item._id || "Unassigned"),
          values: classCounts.map((item) => item.total),
        },
        monthlyOverview: {
          labels: Array.from({ length: daysInMonth }, (_, index) =>
            String(index + 1).padStart(2, "0"),
          ),
          collection: getMonthlySeries(feeEntries, daysInMonth, "entryDate", "paidAmount"),
          expense: getMonthlySeries(expenses, daysInMonth, "date", "amount"),
          income: Array(daysInMonth).fill(0),
          inventorySales: Array(daysInMonth).fill(0),
        },
        traffic: {
          total: trafficTotal,
          items: trafficItems.map((item) => ({
            ...item,
            percent: trafficTotal ? Math.round((item.value / trafficTotal) * 100) : 0,
          })),
        },
        notices: notices.map((notice) => ({
          title: notice.title,
          author: notice.author || "Admin",
          date: formatDate(notice.date || notice.createdAt),
          createdAt: notice.createdAt,
        })),
        socialStats: [
          { key: "news", label: "News posts", value: newsCount },
          { key: "views", label: "News views", value: newsViews },
          { key: "gallery", label: "Gallery photos", value: galleryCount },
          { key: "testimonials", label: "Testimonials", value: testimonialCount },
        ],
      },
    });
  } catch (error) {
    console.error("DASHBOARD SUMMARY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const FeeEntry = require("../../models/Fee/feeEntry.model");
const Student = require("../../models/Student/studentAdmission.models");

const calculateTotals = ({ feeHeads = [], discountAmount = 0, advanceAdjustment = 0, paidAmount = 0 }) => {
  const grossAmount = feeHeads.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalPayable = grossAmount - Number(discountAmount || 0) + Number(advanceAdjustment || 0);
  const dueAmount = totalPayable - Number(paidAmount || 0);
  const status = Number(paidAmount || 0) >= totalPayable ? "Complete" : Number(paidAmount || 0) > 0 ? "Partial" : "Pending";

  return { grossAmount, totalPayable, dueAmount, status };
};

exports.createFeeEntry = async (req, res) => {
  try {
    const {
      studentId,
      entryDate,
      paymentMode,
      feeHeads,
      discountAmount,
      advanceAdjustment,
      paidAmount,
      remark,
      installmentMonth,
      receiptNo,
    } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const totals = calculateTotals({ feeHeads, discountAmount, advanceAdjustment, paidAmount });

    const feeEntry = await FeeEntry.create({
      studentId,
      studentName: student.studentName || student.firstName || "",
      admissionNo: student.admissionNo || "",
      class: student.class || "",
      section: student.section || "",
      entryDate,
      receiptNo,
      paymentMode,
      feeHeads,
      discountAmount: Number(discountAmount || 0),
      advanceAdjustment: Number(advanceAdjustment || 0),
      paidAmount: Number(paidAmount || 0),
      remark,
      installmentMonth,
      ...totals,
    });

    return res.status(201).json({ success: true, message: "Fee entry saved", data: feeEntry });
  } catch (error) {
    console.error("CREATE FEE ENTRY ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentFeeEntries = async (req, res) => {
  try {
    const { studentId } = req.params;
    const entries = await FeeEntry.find({ studentId, isActive: true }).sort({ entryDate: -1 });
    return res.status(200).json({ success: true, count: entries.length, data: entries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

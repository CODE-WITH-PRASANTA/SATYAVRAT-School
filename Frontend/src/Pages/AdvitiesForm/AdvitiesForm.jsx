import React, {
  useEffect,
  useState,
} from "react";

import API, {
  IMAGE_URL,
} from "../../Api/axios";

import "./AdvitiesForm.css";

const AdvertisePopup = () => {

  const [showPopup, setShowPopup] =
    useState(false);

  const [banners, setBanners] =
    useState([]);

  const [currentBanner, setCurrentBanner] =
    useState(0);

  /* ================= FETCH BANNERS ================= */

  const fetchBanners = async () => {
    try {

      const response = await API.get(
        "/banner"
      );

      if (response.data.success) {

        setBanners(
          response.data.data
        );

      }

    } catch (error) {

      console.log(
        "BANNER FETCH ERROR:",
        error
      );

    }
  };

  /* ================= LOAD ================= */

  useEffect(() => {

    fetchBanners();

    const timer = setTimeout(() => {

      setShowPopup(true);

    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  /* ================= AUTO SLIDER ================= */

  useEffect(() => {

    if (banners.length <= 1)
      return;

    const interval = setInterval(() => {

      setCurrentBanner((prev) =>
        (prev + 1) %
        banners.length
      );

    }, 4000);

    return () =>
      clearInterval(interval);

  }, [banners]);

  /* ================= EMPTY ================= */

  if (
    !showPopup ||
    banners.length === 0
  ) {
    return null;
  }

return (
  <div className="advertisePopup">

    {/* OVERLAY */}
    <div
      className="advertisePopup__overlay"
      onClick={() => setShowPopup(false)}
    />

    {/* ONLY BANNER CONTENT */}
    <div className="advertisePopup__content">

      {/* CLOSE BUTTON */}
      <button
        className="advertisePopup__close"
        onClick={() => setShowPopup(false)}
      >
        ×
      </button>

      {/* FULL BANNER IMAGE */}
      <img
        src={`${IMAGE_URL}${banners[currentBanner]?.image}`}
        alt="banner"
        className="advertisePopup__image"
      />

    </div>

  </div>
);
};

export default AdvertisePopup;
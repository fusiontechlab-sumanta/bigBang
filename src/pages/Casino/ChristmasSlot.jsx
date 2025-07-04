import { useEffect } from "react";

const ChristmasSlot = () => {

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      const encodedId = btoa(userId); // Base64 encode
      // window.location.reload()
      window.location.href = `https://casino5.bigbbang.in/public/${encodedId}`;
    }
  }, []);

  return <div>Redirecting...</div>;
};

export default ChristmasSlot;

import { GlobalConstants } from "../../components/constantes/GlobalConstants";

const WhatsAppButton = () => {

  const openWhatsApp = () => {
    const url = `https://wa.me/${GlobalConstants.PHONE_NUMBER}?text=${encodeURIComponent(GlobalConstants.MESSAGE)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-4 right-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-[99] overflow-hidden"
      style={{
        width: "60px", // Tamaño del botón
        height: "60px",
      }}
      aria-label="Chat en WhatsApp"
    >
      <img
        src="./whatsAppButton.png"
        alt="WhatsApp"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </button>
  );
};

export default WhatsAppButton;
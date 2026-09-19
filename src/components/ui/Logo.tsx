import Image from "next/image";
import dashboard from "../../../public/dashboard.png";
function Logo() {
  return (
    <div className="text-center">
      <Image src={dashboard} alt="Logo" width={100} height={100} />
    </div>
  );
}

export default Logo;

import Image from "next/image";
import JsIcon from "@/assets/icons/square-js.svg";
import HtmlIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";

const toolboxItems = [
  {
    title: "Javascript",
    icon: <Image src={JsIcon} alt="Javascript" width={40} height={40} />,
  },
  {
    title: "HTML 5",
    icon: <Image src={HtmlIcon} alt="HTML 5" width={40} height={40} />,
  },
  {
    title: "Css 3",
    icon: <Image src={CssIcon} alt="Css 3" width={40} height={40} />,
  },
  {
    title: "React",
    icon: <Image src={ReactIcon} alt="React" width={40} height={40} />,
  },
  {
    title: "Chrome",
    icon: <Image src={ChromeIcon} alt="Chrome" width={40} height={40} />,
  },
  {
    title: "Github",
    icon: <Image src={GithubIcon} alt="Github" width={40} height={40} />,
  },
];

export default toolboxItems;

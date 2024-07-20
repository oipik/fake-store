import { Link } from "react-router-dom";

import vk from "../../images/social-vk.svg";
import telegram from "../../images/social-telegram.svg";
import whatsapp from "../../images/social-whatsapp.svg";

const Contacts: React.FC = () => {
  return (
    <section className="flex flex-col items-center">
      <h2>Контакты</h2>
      <p>Если у вас возникли вопросы, свяжитесь с нами любым удобным для вас способом.</p>
      <div className="flex space-x-3 mt-4">
        <Link
          to="https://vk.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="object-fit w-10 h-10 cursor-pointer" src={vk} alt="link to vk" />
        </Link>
        <Link
          to="https://web.telegram.org/k/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="object-fit w-10 h-10 cursor-pointer" src={telegram} alt="link to telegram" />
        </Link>
        <Link
          to="https://web.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="object-fit w-10 h-10 cursor-pointer" src={whatsapp} alt="link to whatsapp" />
        </Link>
      </div>
    </section>
  )
}

export default Contacts;
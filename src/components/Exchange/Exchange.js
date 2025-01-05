import { useLocation } from "react-router-dom";
import { EditExchangeForm } from "../../forms/ExchangeForm/EditExchangeForm";
import { NewExchangeForm } from "../../forms/ExchangeForm/NewExchangeForm";

export const Exchange = (props) => {
  const location = useLocation();
  const isNew = props.isNew || location.pathname.split('/')[-1] === 'new';

  return (
    <>
      {isNew ? <NewExchangeForm /> : <EditExchangeForm /> }
    </>
  )
}

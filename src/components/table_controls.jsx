import { Button, Container } from "react-bootstrap";
import { Trash, LockFill, UnlockFill } from "react-bootstrap-icons"
import { handleClick} from "../../server/scripts";

export default function TableControls({ onButtonClick, find}) {
    const combinedClickHandler = (e) => {
        handleClick(e, find);
        onButtonClick();
      }

   return (
    <Container className="controls_container"> 
        <Button type='button' variant="dark" className="controls_button" id = "block" onClick={combinedClickHandler}>
            <LockFill className="icon"/> Block
        </Button>
        <Button type='button' variant="dark" className="controls_button" id = "unblock" onClick={combinedClickHandler} >
            <UnlockFill className="icon"/> Unblock
        </Button>
        <Button type='button' variant="danger" className="controls_button" id = "delete" onClick={combinedClickHandler}>
            <Trash className="icon"/> Delete
        </Button>
    </Container>
   );
}
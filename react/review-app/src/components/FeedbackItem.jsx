import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Card from "./shared/Card";

const FeedbackItem = ({item, handleDelete}) => {
   

  return (
    
    <Card>
      <div className='card-wrapper'>

      <h4>{item.text}</h4>

        <div>
        <div className="edit"><FaEdit/></div>
        <div className="delete"><MdDelete onClick={() => handleDelete(item.id)}/></div>
        </div>
      </div>

    </Card>

       

       
  
  )
}

export default FeedbackItem
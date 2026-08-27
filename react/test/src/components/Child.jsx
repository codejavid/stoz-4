
import { useContext, useState } from 'react'
import ChangenameContext from '../context/ChangenameContext'
import ChangeemailContext from '../context/ChangeemailContext';


const Child = ({readX, handleMessage}) => {


    const {name, changeName} = useContext(ChangenameContext);
    const {email, changeEmail} = useContext(ChangeemailContext);

    const [links, setLinks] = useState([
      {link:"this is a link 1"},
      {link:"this is a link 2"},
      {link:"this is a link 3"},
    ])

    const [story, setStory] = useState("");

    const handleAddLink = (newLink) => {
      // console.log(links);
      // links.push({link:"this is a link 4"})
      // console.log(links);

      setLinks((prev) => [newLink, ...prev]);
    }



  return (
    <div>
        <h1>{name}</h1> 
        <h2>{email}</h2>
        <button onClick={() => changeName("arun")}>Change Name</button>
        <br />
        <br />
        <button onClick={() => changeEmail("a@gmail.com")}>Change email</button>
        <br />
        <br />

        <h3>{story}</h3>

        <input type="text" value={story} onChange={(e) => setStory(e.target.value)}/>

        <br />

        <ul>
          {links.map((item) => (
            <li key={item.link}>{item.link}</li>
          ))}
        </ul>

        <button onClick={() => handleAddLink({link:"this is a link 4"})}>Add link</button>
    </div>
  )
}

export default Child
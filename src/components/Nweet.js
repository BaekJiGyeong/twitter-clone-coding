import React, {useState} from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Nweet = ({nweetObj, isOwner}) => 
{
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef = doc(dbService,"nweets", `${nweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log("ok "+ok);
        if(ok){
            await deleteDoc(NweetTextRef);
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await updateDoc(NweetTextRef, {
            text:newNweet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target : {value},
        }=event;
        setNewNweet(value);
    };
    return (
        <div key={nweetObj.id}>
            {
                editing ? 
                (
                    <>
                      <form>
                        <input
                          type="text"
                          placeholder="Edit your nweet"
                          value={newNweet}
                          required
                          onChange={onChange}
                        />
                        <input type="submit" onClick={onSubmit} value="Update" />
                      </form>
                      <button onClick={toggleEditing}>Cancel</button>
                    </>
                  )
                : 
                (
                    <>
                      <h4>{nweetObj.text}</h4>
                      {isOwner && (
                        <>
                          <button onClick={onDeleteClick}>Delete</button>
                          <button onClick={toggleEditing}>Edit</button>
                        </>
                      )}
                    </>
                )
            }
        </div>
    );
};

export default Nweet;
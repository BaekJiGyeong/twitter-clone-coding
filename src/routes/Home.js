import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] =  useState("");
    const [nweets, setNweets] = useState([]);
    // const getNweets = async() => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     dbNweets.forEach((document)=>
    //         {
    //             const nweetObject={
    //                 ...document.data(),
    //                 id:document.id
    //             };
    //             setNweets((prev)=>[document.data(), ...prev]);
    //         }
    //     );
    // }
    useEffect(()=>{
        const q = query(collection(dbService,"nweets"), orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=> {
            const nweetArr = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }));
            setNweets(nweetArr);
        });
    }, []);
    const onSubmit = async(event) => {
        event.preventDefault();
        const docRef = await addDoc(collection(dbService,"nweets"),{
            text:nweet,
            createdAt : Date.now(),
            creatorId:userObj.uid
        });
        setNweet("");
    }
    const onChange = (event) => {
        const {
            target:{value}
        } = event;
        setNweet(value);
    }
    return (
        <div className="nweet">
            <form onSubmit={onSubmit} className="container nweetEdit">
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} className="formInput"/>
                <input type="submit" value="Twitter" className="formBtn"/>
            </form>
            <div style={{marginTop:30}}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
};

export default Home;
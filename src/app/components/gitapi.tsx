'use client'
import { useState } from "react";
import Image from "next/image";

interface GitUser {
  name: string;
  bio: string;
  avatar_url: string;
  followers_url: string;
}

const GitApi: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [data, setData] = useState<GitUser | null>(null);
  const [followers, setFollowers] = useState<any[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const onSearchHandler = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const userData: GitUser = await response.json();
      setData(userData);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };
  const onFollowerHandler = async () => {
    try {
      if (!data) return;
      const response = await fetch(data.followers_url);
      if (!response.ok) {
        throw new Error("Error fetching followers");
      }
      const followersData: any[] = await response.json();
      setFollowers(followersData);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  return (
    <div>
      <div className="mx-2">
        <label className="text-xl font-bold" htmlFor="">User Name: </label>
        <input className="border rounded-lg pl-4 my-2 py-1.5"
          type="text"
          placeholder="Enter username"
          onChange={onChangeHandler}
        /><br />
        <button className="bg-slate-900 hover:bg-slate-400 rounded-lg px-4 ml-[117px] py-1.5 mb-5 text-white font-semibold" onClick={onSearchHandler}>Search</button>
        {data &&   (
          <div>
            <img
              src={data.avatar_url}
              alt="User Photo"
              width={150}
              height={100}
            />
            <p className="text-lg font-semibold">Name: <span className=" font-normal">{data.name}</span></p>
            <p className="text-lg font-semibold">Bio: <span className=" font-normal">{data.bio}</span></p>
            <div>
        <button className="bg-slate-900 hover:bg-slate-400 rounded-lg px-4 ml-[117px] py-1.5 text-white font-semibold" onClick={onFollowerHandler}>Followers</button>
        {followers && (
              <div>
                <h2 className="text-lg font-semibold">Followers:</h2>
                <ul  className="grid md:grid-cols-4 grid-cols-2 place-content-center place-items-center gap-y-8">
                  {followers.map((follower: any) => (
                    <div key={follower.id} className="text-center flex flex-col justify-center items-center">
                   
                     <li >{<img src={follower.avatar_url} alt="followersPhoto" width={100} />} </li>
                     <li className="text-lg font-semibold">{follower.login} </li>
                   
                     </div>
                  ))}
                </ul>
              </div>
            )}
       
        </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default GitApi;

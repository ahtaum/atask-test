import { useState } from "react"
import { GithubUserProfile, getUserData } from "../config/github"

function MainForm() {
    let [username, setUsername] = useState("")
    let [profileData, setProfileData] = useState<GithubUserProfile | null>(null)
    let [loading, setLoading] = useState(false)

    let handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            setLoading(true)
            let data = await getUserData(username)
            setProfileData(data)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-2">

            <div className="card bg-base-200 shadow-xl mb-8">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 form-control">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered mb-3" placeholder="Enter Username" />

                            <button type="submit" className="btn btn-primary w-full">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            {loading && (
                <div className="text-center text-lg">Loading...</div>
            )}

            {profileData && (
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-300 rounded-box text-white">
                    <div className="collapse-title text-xl font-medium">{profileData.name}</div>
                    <div className="collapse-content">
                        {profileData.repos && (
                            <div>
                                <ul>
                                    {profileData.repos.map((repo: any) => (
                                        <li className="text-lg mb-3" key={repo}>{repo}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default MainForm
import Gravatar from "react-gravatar"

type Props = {
    username: string
    avatarHash: string
}

export function AccountHeader({username, avatarHash}: Props) {
    return <div className="flex flex-row p-2 gap-2 items-center">
        <Gravatar md5={avatarHash}></Gravatar>
        <h1>{username}</h1>
    </div>

}
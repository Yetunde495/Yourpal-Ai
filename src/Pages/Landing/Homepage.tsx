import { Link } from "react-router-dom";




const Homepage: React.FC = () => {
    return (
        <div>
          <div className="w-full h-40 flex justify-center items-center">
          <Link to={'/signin'} className="bg-black text-white px-6 py-3">Sign in</Link>

          </div>
        </div>
    )
}

export default Homepage;
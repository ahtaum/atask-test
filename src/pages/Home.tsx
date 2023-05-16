import { Helmet } from "react-helmet"
import MainForm from "../components/MainForm"

export default function Home() {
    return (
        <>

        <Helmet>
            <title>Homepage</title>
        </Helmet>
        
        <section id="home-page" className="container my-8">

            <MainForm />

        </section>

        </>
    )
}

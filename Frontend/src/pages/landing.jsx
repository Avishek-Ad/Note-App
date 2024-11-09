import NavBar from "../components/NavBar";
import SetBackground from "../components/SetBackground";

function Landing() {
    return (
        <div>
        <NavBar />
        <SetBackground />
        <div className="flex flex-row w-1/2 mx-5 dark:text-white">
            <h3 className="text-5xl mt-10 mr-5">Note App</h3>
            <div className="mt-10 border-l-2">
                <h4 className="text-3xl mx-10 mb-5 underline">About</h4>
                <div className="text-xl p-5">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Impedit, obcaecati unde nulla nesciunt sunt cupiditate 
                    minima officia accusamus alias quibusdam perspiciatis! 
                    Doloribus, expedita dignissimos?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Porro inventore explicabo excepturi reiciendis facilis 
                    adipisci, odio sit voluptatem rem, dicta quibusdam ratione 
                    expedita quo.
                </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Landing;
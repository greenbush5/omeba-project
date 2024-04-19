import './App.css';
import Flickity from 'react-flickity-component';
import './flickity.css'
import cloud from "./images/cloud.jpg"
import tree from "./images/tree.jpg"
import tree2 from "./images/tree2.jpg"

const flickity0ptions =
{
initialIndex: 2
}

const cars = {
id: [1,2,3],
title: ['tree', "tree2", 'cloud'],
image: [cloud, tree, tree2]
}

function App() {
    return (
        <div className= 'App'>
            <Flickity
            className= "Slider"
            elementType= "div"
            disableImagesLoaded= {false}
            options={flickity0ptions}
            reloadOnUpdate
            static
            >
            {cars['id'].map((index) =>{
                return (
                    <div key={index} className='Plate'>
                        <> 
                        <h2>{cars['title'][index - 1]}</h2>
                        <div style={{
                            backgroundImage: `url(${cars['image'][index - 1]})`,
                            width: "100%",
                            height: 600,
                            backgroundSize: "cover",
                            }}></div>
                        </>
                    </div>
                ) 
            })}

            </Flickity>
        </div>
    
    )

}
export default App;
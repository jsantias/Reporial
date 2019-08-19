
function obtainObjectProperties(rsp) {
    let s = "";
    
    s = "total number is: " + rsp.items.length + "<br/>";
    s += 'Youtube video id is: ' + rsp.items[0].id.videoId + "<br/>";
    
    //Find element with id "app" and inject string
    const appDiv = document.getElementById("app"); 
    appDiv.innerHTML = s; 
} 

const query = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=skateboarding+dog&type=video&videoDefinition=high&key=";

fetch(query) 
    .then( (response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then( (rsp) => obtainObjectProperties(rsp))
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
    });

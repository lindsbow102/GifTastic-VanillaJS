var searchArr = ["popcorn", "donuts", "chocolate", "cookies", "coffee", "avocado", "banana"];

      // function to make buttons and add to page
      function createButtons(array) {
        //Empty buttons area when new button is created to avoid repeats
        document.getElementById("buttons-area").innerHTML = "";

        for (var i = 0; i < array.length; i++) {
          
          var a = document.createElement("button");
          a.classList.add("search-button");
          a.setAttribute("data-type", array[i]);
          a.innerHTML = array[i];
          document.getElementById("buttons-area").append(a);
        }

        // When user clicks on button, giphy generates images of that button's text
        document.querySelectorAll(".search-button").forEach(function(button) {
          button.addEventListener("click", function() {
            
            document.getElementById("giphys").innerHTML = "";

            const type = this.getAttribute("data-type");
            console.log("you clicked " + type);

            const queryURL =
              "https://api.giphy.com/v1/gifs/search?q=" +
              type +
              "&api_key=dc6zaTOxFJmzC&limit=10";

            fetch(queryURL)
              .then(function(res) {
                return res.json();
              })
              .then(function(response) {
                console.log(response);

                for (var i = 0; i < response.data.length; i++) {
            
                  const searchDiv = document.createElement("div");
                  searchDiv.classList.add("search-item");

                  var rating = response.data[i].rating;

                  // Display Rating
                  const p = document.createElement("p");
                  p.innerHTML = "Rating: " + rating;

                  var animated = response.data[i].images.fixed_height.url;
                  var still = response.data[i].images.fixed_height_still.url;

                  // Display image
                  const image = document.createElement("img");
                  image.setAttribute("src", still);                  
                  image.setAttribute("data-still", still);                  
                  image.setAttribute("data-animate", animated);                  
                  image.setAttribute("data-state", "still");                  
                  image.classList.add("search-image");
                  searchDiv.append(p);
                  searchDiv.append(image);

                  // Append the entire searchDiv (rating and image) to our giphys area
                  document.getElementById("giphys").append(searchDiv);
                }

                // Toggles between still and animated images
                document
                  .querySelectorAll(".search-image")
                  .forEach(function(img) {
                    img.addEventListener("click", function() {
                      console.log("You clicked me");
                        var state = this.getAttribute("data-state");
                        console.log(state);

                        if (state === "still") {
                          this.setAttribute("src", this.getAttribute("data-animate"));
                          this.setAttribute("data-state", "animate");
                        } else {
                          this.setAttribute("src", this.getAttribute("data-still"));
                          this.setAttribute("data-state", "still");
                        }
                    });
                  });
              });
          });
        });
      }

      createButtons(searchArr);

      document
        .getElementById("add-search")
        .addEventListener("click", function(event) {
          event.preventDefault();
          var newSearch = document.getElementById("search-input").value.trim();
          searchArr.push(newSearch);
          createButtons(searchArr);
          console.log(searchArr);
          
          //Clear input box after new search is submitted
          document.getElementById("search-input").value = "";
          
        });
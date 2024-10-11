const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("review");
const submitBtn = document.getElementById("submit");
const reviewsContainer = document.getElementById("reviews");

$(document).ready(function(){
    $('.artikel-item').click(function(){
        const value = $(this).attr('data-filter')
        if (value === "all") {
            $(".artikel-box").hide(); 
            $(".artikel-box:lt(3)").show("1000");
        } else {
            $(".artikel-box")
                .not("."+value)
                .hide("1000")
            $(".artikel-box")
                .filter("."+value)
                .show("1000")
        }
    });
    // Tambahin Button Active
    $(".artikel-item").click(function(){
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});

stars.forEach((star) => {
    star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
        rating.innerText = value;

        // Remove all existing classes from stars
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five"));

        // Add the appropriate class to 
        // each star based on the selected star's value
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });

        // Remove "selected" class from all stars
        stars.forEach((s) => s.classList.remove("selected"));
        // Add "selected" class to the clicked star
        star.classList.add("selected");
    });
});

submitBtn.addEventListener("click", () => {
    const review = reviewText.value;
    const userRating = parseInt(rating.innerText);

    if (!userRating || !review) {
        alert(
"Silakan pilih rating dan berikan ulasan sebelum mengirimkan."
            );
        return;
    }

    if (userRating > 0) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = 
`<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
        reviewsContainer.appendChild(reviewElement);

        // Reset styles after submitting
        reviewText.value = "";
        rating.innerText = "0";
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five", 
                                                "selected"));
    }
});

function getStarColorClass(value) {
    switch (value) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        default:
            return "";
    }
}

let images = document.querySelectorAll('.maintenance__image')
let i = 0

function imagesLoop() {
    function setImage() {
        for (let a = 0; a < images.length; a++) {
            images[a].classList.remove('maintenance__image_active')
        }

        images[i].classList.add('maintenance__image_active')
    }
    if (i < 16) {
        setImage()
        i++
    }
    else {
        setImage()
        i = 0
    }

    setTimeout(function() {
        imagesLoop()
    }, 1500)
}
if (images.length)
    imagesLoop()
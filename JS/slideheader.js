
    const slides = [

      {
        image:
        "../src/Banner/pic las.jpg",

       logo:
        "../src/logo/LOGO Pink​  2024 t-01.png",

        name:
        "សាខាទី១",

        text:
        "សាខា ស្វាយអន្ទរ"
      },

      {
        image:
            "../src/beanea/front.jpg",


        logo:
        "../src/logo/LOGO Pink​  2024 t-01.png", 

        name:
        "សាខាទី២",
        text:
        "សាខា ពានាផ្សារ"
      },
      
      {
        image:
        "../src/reangov/front.jpg",
       

        logo:
        "../src/logo/LOGO Pink​  2024 t-01.png", 

        name:
        "សាខាទី៣",
        text:
        "សាខា អូរាំងឪ"
      },
      
      {
        image:
        "../src/seangfeang/front.jpg",

        logo:
        "../src/logo/LOGO Pink​  2024 t-01.png",

        name:
        "សាខាទី៤",

        text:
        "សាខា ឃុំស៊ាងហ្វាង"
      },
        {
        image:
        "../src/seangfeang/front.jpg",

        logo:
        "../src/logo/LOGO Pink​  2024 t-01.png", 

        name:
        "សាខាទី៥",
        text:
        "សាខា ឃុំជប់"
      },
      
        {
        image:
        "../src/cheach/front.jpg",

        logo:
        "../src/logo/LOGO Pink​  2024 t-01.png", 

        name:
        "សាខាទី៦",
        text:
        "សាខា ឃុំជាច"
      },
        {
        image:
        "../src/smong/front.jpg",

        logo:
        "../src/logo/LOGO Pink​  2024 t-01.png", 

        name:
        "សាខាទី៧",
        text:
        "សាខា ស្មោង"
      },
      

    ];

    let current = 0;

    const hero =
    document.getElementById("heroVisual");

    const schoolLogo =
    document.getElementById("schoolLogo");

    const schoolName =
    document.getElementById("schoolName");

    const schoolText =
    document.getElementById("schoolText");

    function updateSlide(){

      hero.style.backgroundImage = `
      linear-gradient(
        180deg,
        rgba(19,35,58,.55),
        rgba(19,35,58,.55)
      ),
      url('${slides[current].image}')
      `;

      schoolLogo.src =
      slides[current].logo;

      schoolName.innerText =
      slides[current].name;

      schoolText.innerText =
      slides[current].text;
    }

    function nextImage(){

      current =
      (current + 1)
      % slides.length;

      updateSlide();

    }

    function prevImage(){

      current =
      (current - 1 + slides.length)
      % slides.length;

      updateSlide();

    }

    /* FIRST LOAD */
    updateSlide();

    /* AUTO SLIDE */
    setInterval(
      nextImage,
      6000
    );

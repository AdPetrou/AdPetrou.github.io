let appHeader = /*html*/`
    <header class="block-header">
    <!-- Title -->
    <section class="block-content">
        <div class="__element-img-wrapper">
            <img src="./Assets/Images/Adam Petrou.png"></img>
        </div>
        <div class="block-description">
            <h3 class="__element-subtitle"><i class="fa-solid fa-house"></i> Home & About</h3>
            <h3 class="__element-subtitle"><i class="fa-solid fa-trowel-bricks"></i> Level Design</h3>
            <h3 class="__element-subtitle"><i class="fa-solid fa-gamepad"></i> Game Development</h3>
            <h3 class="__element-subtitle"><i class="fa-solid fa-globe"></i> Front-End Suite </h3>
            <h3 class="__element-subtitle"><i class="fa-solid fa-globe"></i> Other Projects </h3>
        </div>
    </section>

    <section class="block-links">
        <a class="__modifier-boxshadow-none" href="mailto:Adam.Petrou@Yahoo.com?subject=Feedback&body=Message">
            <h5>Contact</h5>
        </a>
        <a class="__modifier-boxshadow-none" href="https://www.patreon.com/EXITMods">
            <h5>Patreon</h5>
        </a>
        <a class="__modifier-boxshadow-none" href="https://next.nexusmods.com/profile/Reper343/about-me">
            <h5>Nexus</h5>
        </a>
        <a class="__modifier-boxshadow-none" href="https://github.com/AdPetrou">
            <h5>GitHub</h5>
        </a>
    </section>
</header>
`;
document.getElementById("header").innerHTML = appHeader;
let appHomeContent = /*html*/`
<h1>Hello, I'm Adam...</h1>
<br>
<p class="__modifier-center"> 
    <b>
    I am a London (UK) based, aspiring Game Developer and Level Designer with thousands of hours of experience in Industry standard game engines, such as Unity and Unreal, 
    and over 3 thousand hours in 3d Art software, such as Blender and Substance Painter.
    </b>
    <br>
    I also have a hobby and passion for Mods and Mod creation.
    My love for gaming started with Pokemon on the DS and has just kept growing since. It soared when I first downloaded Skyrim on my old Sony laptop to download mods back in 2013, 
    since then I have been fascinated with creating my own mods. I started out at 14 years old as a Level Designer for the large, semi-professional modding team Beyond Skyrim,
    with this fascination eventually turning into a passion for game development.
    <br>
    <br>
    My most successful project (Badly Translated Skyrim) garnered a lot of attention online, with over 3 million views across multiple youtube videos, and a very positive reception.
    While that mod is mostly complete, my current modding project, Fallout Skyrim, is a spare time passion project and an attempt to merge 2 of my favourite games (Fallout and Skyrim) 
    with the result hopefully ending in a completely new game.
    <br>
</p>

<br>
<Figure class="__modifier-ceneter">
    <img class="__element-showcase" src="Assets/GIFs/FoRiften 1.gif" alt="GIFs to showcase my Level Design">
    <figcaption> Before/After screenshots of my upcoming mod - Fallout Riften</figcaption>
</Figure>
<br>
<br>

<p class="__modifier-center"> 
    Though I have yet to release a game I've made, I have spent a lot of time recreating systems from other games that I've enjoyed in engines like Unity and Unreal.
    My first large project in Unity was a recreation of Minecrafts world generation. Though the result wasn't as performant and robust as Minecrafts, 
    it taught me a lot about C# and 3D game development in general. Especially understanding threading, optimisation and procedural generation.
    <br>
    <br>

</p>
`;

const tempContainer = document.createElement('div');
tempContainer.classList.add("block-content");
tempContainer.id = "home-about-content";
tempContainer.innerHTML = appHomeContent;

document.getElementById("content").appendChild(tempContainer);
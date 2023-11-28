// Add channels that user has in their channel storage.
window.onload = function () {
    // For each user channel
    // (userChannels is defined in 'config.js')
    for (const channel of userChannels) {
        // Get the first blank channel
        var target = document.getElementsByClassName('ch blank')[0];

        // First, we remove the "blank" class name & add "occupied".
        target.classList.remove('blank');
        target.classList.add('occupied');

        // Now, we inject stuff from the channel config in the target.
        target.setAttribute('data-id' , channel.id);
        // Add target href if channel has a target
        if (channel.target) {
            target.setAttribute('data-href', channel.target)
        }
        // If is a disc channel
        hasDisc = '';
        if (channel.disc == true) {
            hasDisc = 'id="discTag"';

            target.insertAdjacentHTML(`afterbegin`,
            
            `
            <img src="channelart/disc/disc.png" class="spinnin" />
            `
            )
        }
        // Main inject
        // If channel has the 'custom' var:
        target.insertAdjacentHTML('afterbegin', 
        
        `
        <iframe src="${channel.channelart}${channel.id}/channel.html"></iframe>
        <div class="onhover" onmouseover="playSFX('button-hover.mp3', 0.2)" onclick="zip()"></div>
        <span class="tag" ${hasDisc}>${channel.title}</span>
        `
        )
    }
}

// Add channel
// Adds to channel config too.
// Defaults: addChannel('id', 'Title', 'path-to-assests', 'path-to-channelart')
// (Everything else is optional)
function addChannel(id, title, assests, channelart, target) {
    // Check stuff that's required
    if (!id) {
        console.error(`addChannel: You must supply a id!`)
        console.log(`Defaults: addChannel('id', 'Title', 'path-to-assests', 'path-to-channelart')`);
    } else if (!title) {
        console.error(`addChannel: You must supply a title!`)
        console.log(`Defaults: addChannel('id', 'Title', 'path-to-assests', 'path-to-channelart')`);
    } else if (!assests) {
        console.error(`addChannel: You must supply the assests directory! (Don't include the id with this var)`)
        console.log(`Defaults: addChannel('id', 'Title', 'path-to-assests', 'path-to-channelart')`);
    } else if (!channelart) {
        console.error(`addChannel: You must supply the channelart directory! (Don't include the id with this var)`)
        console.log(`Defaults: addChannel('id', 'Title', 'path-to-assests', 'path-to-channelart')`);

    // Pass!!!!!!
    } else {
        // Channel.
        var channel = {
            id: id,
            title: title,
            assests: assests,
            channelart: channelart
        }
        // If there's a target, add it.
        if (target) {
            channel.target = target;
        }
        
        // Push to userChannels & storage.
        userChannels.push(channel);
        // localStorage.setItem("onliine-channels", userChannels);
        return console.log(`new channel storage: `, userChannels);
    }
}
// Remove channel
// Removes from channel config too.
function removeChannel(id) {
    // Find channel by id.
    var channel = userChannels.findIndex((element) => element.id === id);

    // If couldn't find the channel
    if (!channel) {
        console.error('removeChannel: Couldn\'t find a channel with that id!');
    }

    // Remove class name 'occupied'
    var targetDiv = $(`[data-id="${id}"]`)[0];
    targetDiv.classList.remove('occupied');
    // Remove all child nodes
    while (targetDiv.firstChild) {
        targetDiv.removeChild(targetDiv.firstChild);
    }
    // Make it blank
    targetDiv.classList.add('blank');
    // Move it to the bottom to re-align all the other channels
    targetDiv.parentNode.appendChild(targetDiv);

    // Splice from userChannels
    userChannels.splice(channel, 1)
    console.log(`removed channel '${id}': `, userChannels);
    // Edit local storage
    localStorage.setItem("onliine-channels", JSON.stringify(userChannels));
}
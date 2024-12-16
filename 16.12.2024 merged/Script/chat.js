const chatbutton = document.getElementById('chat-button');

function toggleChatPopup() {
    const chatPopup = document.getElementById('chatPopup');
    if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
      chatPopup.style.display = 'flex';
    } else {
      chatPopup.style.display = 'none';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let currentuser = JSON.parse(localStorage.getItem('current-user'));
    const chatbutton = document.querySelector('.chat-button');

    // Check if the history exists and has content
    if (currentuser && currentuser.history && currentuser.history.length > 0) {
        chatbutton.style.display = 'block';  // Show the chat button
    } else {
        chatbutton.style.display = 'none';  // Hide the chat button
    }
});

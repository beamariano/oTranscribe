oT.backup = {};

oT.backup.openPanel = function(){
    oT.backup.populatePanel();
    $('.backup-panel').fadeIn('fast');
}

oT.backup.closePanel = function(){
    $('.backup-panel').fadeOut('fast');
}

oT.backup.generateBlock = function(ref){
    // create icon and 'restore' button
    var text = localStorage.getItem(ref);
    var timestamp = ref.replace('oTranscribe-backup-','');
    var date = oT.backup.formatDate(timestamp);
    
    var block = document.createElement('div');
    var doc = document.createElement('div');
    var restoreButton = document.createElement('div');

    block.className = 'backup-block';
    doc.className = 'backup-doc';
    restoreButton.className = 'backup-restore-button';

    doc.innerHTML = text;
    restoreButton.innerHTML = date+' - restore';
    block.appendChild(doc);
    block.appendChild(restoreButton);
    
    return block;
}

oT.backup.formatDate = function(timestamp){
    var d = new Date( parseFloat(timestamp) );
    var day =  d.getDate() + '/' + (d.getMonth()+1);
    var now = new Date();
    today = now.getDate() + '/' + (now.getMonth()+1);
    yesterday = (now.getDate()-1) + '/' + (now.getMonth()+1);
    if (day === today) {
        day = 'Today';
    } else if (day === yesterday) {
        day = 'Yesterday'
    }
    var time = + d.getHours() + ':' + d.getMinutes();
    formattedDate = day + ' ' + time;
    return formattedDate;
}

oT.backup.populatePanel = function(){
    // fill panel with four icons
    var docs = oT.backup.list();
    docs = docs.slice(0,10);
    for (var i = 0; i < docs.length; i++) {
        $('.backup-window').append( oT.backup.generateBlock(docs[i]) );
    }
}

oT.backup.save = function(){
    // save current text to timestamped localStorage item
    var text = document.getElementById("textbox");
    var timestamp = new Date().getTime();
    localStorage.setItem('oTranscribe-backup-'+timestamp, text.innerHTML);
    // and bleep icon
}

oT.backup.init = function(){
    setTimeout(function(){
        oT.backup.save();
    },300000 /* 5 minutes */);
}

oT.backup.list = function(){
    var result = [];
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf('oTranscribe-backup') > -1) {
            result.push(localStorage.key(i));
        }
    }
    return result.sort().reverse();
}

// original autosave function
function saveText(){
    var field = document.getElementById("textbox");
    // load existing autosave (if present)
    if ( localStorage.getItem("autosave")) {
       field.innerHTML = localStorage.getItem("autosave");
    }
    // autosave every second - but wait five seconds before kicking in
    setTimeout(function(){
        setInterval(function(){
           localStorage.setItem("autosave", field.innerHTML);
        }, 1000);
    }, 5000);
}

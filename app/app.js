var obj = {
    "dispatcher_rules":{
        "1":{
            "rule_name": "Finance Payment or Invoice issues",
            "subject_contains": ["Payment", "Invoice", "annexure", "form 16", "refund", "annexure"],
            "subject_does_not_contains": ["Food Prepared", "Cancelled", "Cancel"],
            "city": [],
            "source_is": "Email",
            "tier": "",
            "assign_to_group": "PS-Finance",
            "group_id": 16000080788
        },
        "2":{
            "rule_name": "Payment of cancelled order",
            "subject_contains": ["Cancel", "Food prepared", "Cancel Order","Cancelled Order", "food ready", "food was ready", "food was prepared", "Canceled"],
            "subject_does_not_contains": ["Payment,Invoice", "annexure", "form 16", "refund", "annexure"],
            "city": [],
            "source_is": "Email",
            "tier": "",
            "assign_to_group": "PS CC",
            "group_id": 16000081389
        },
        "3":{
            "rule_name": "GST - GSTIN Submission",
            "subject_contains": ["gst"],
            "subject_does_not_contains": [],
            "city": [],
            "source_is": "Email",
            "tier": "",
            "assign_to_group": "PS-Finance",
            "group_id": 16000080788
        }
    }
};


function addUpdateBtn (){
    console.log("clicked");
    client.data.get('ticket').then(function (data) {
        var subject = data.ticket.subject;
        console.log(data);
        var keys = Object.keys(obj["dispatcher_rules"]);
        var keys_len = keys.length;
        for (var i=0; i<keys_len; i++) {
            var subj_contains = obj["dispatcher_rules"][keys[i]]["subject_contains"];
            var subj_not_contains = obj["dispatcher_rules"][keys[i]]["subject_does_not_contains"];
            var city = obj["dispatcher_rules"][keys[i]]["city"];
            var subj_contains_len = subj_contains.length;
            var subj_not_contains_len = subj_not_contains.length;
            var city_len = city.length;
            var subj_contains_bool = true;
            var subj_not_contains_bool = true;
            var city_bool = true;

            for (var j = 0; j < subj_contains_len; j++) {
                if (subject.includes(subj_contains[j])) {
                    subj_contains_bool = true;
                    break;
                }
                else {
                    subj_contains_bool = false;
                }
            }

            for (var k = 0; k < subj_not_contains_len; k++) {
                if (!subject.includes(subj_not_contains[k])) {
                    subj_not_contains_bool = true;
                }
                else {
                    subj_not_contains_bool = false;
                    break;
                }
            }

            for (var l = 0; l < city_len; l++) {
                if (subject.includes(city[l])) {
                    city_bool = true;
                    break;
                }
                else {
                    city_bool = false;
                }
            }

            console.log(subj_contains_bool && subj_not_contains_bool && city_bool);
            if (subj_contains_bool && subj_not_contains_bool && city_bool) {
                var gname = obj["dispatcher_rules"][keys[i]]["assign_to_group"];
                var gid = obj["dispatcher_rules"][keys[i]]["group_id"];

                console.log(gid);

                // trying to update subject instead of group ID

                client.request.put("https://YDE0ZE3teJdGZzQ1JfsV@convergytics.freshdesk.com", {
                    "headers" : {
                        "Content-type": "application/json"
                    },
                    "body": JSON.stringify({
                        "subject": "TTT"
                    })
                }).then(function (data) {
                    console.log("worked");
                }, function (err) {
                    console.log(err);
                });
            }
        }
    });
}


var client;
$(document).ready( function() {
    app.initialized()
        .then(function(_client) {

          client = _client;
          client.events.on('app.activated',
            function() {
                client.data.get('contact')
                    .then(function(data) {

                    })
                    .catch(function(e) {
                        console.log('Exception - ', e);
                    });


        });
    });
});

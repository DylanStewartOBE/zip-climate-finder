$(document).ready(function(){
    $("#check-btn").click(function(){
        var zipCode = $("#zip-input").val();
        $.getJSON("This_Is_The_One.json", function(data){
            var city, state;
            $.each(data, function(key, value){
                if(value["zip"] == zipCode){
                    city = value["city"];
                    state = value["state"];
                    return false;
                }
            });
            
            if(city && state){
                $.getJSON("zip-climate.json", function(climateData){
                    var climateZone;
                    $.each(climateData, function(key, value){
                        if(value["State"] == state && value["City"] == city){
                            climateZone = value["Climate Zone"];
                            return false;
                        }
                    });
                    
                    if(climateZone){
                        $("#error").html("");
                        $("#result").html("City: " + city + "<br>State: " + state + "<br>Climate Zone: " + climateZone);
                    } else {
                        $("#result").html("");
                        $("#error").html("Error: Climate zone not found");
                    }
                });
            } else {
                $("#result").html("");
                $("#error").html("Error: Zip code not found");
            }
        });
    });
});
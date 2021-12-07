class UserStats{
    
    constructor(stats){
        this.stats = stats;
    }

    get kd(){
        let kills = this.stats.total_kills;
        let deaths = this.stats.total_deaths;
        deaths = deaths === 0 ? 1 : deaths;

        return (kills/deaths).toFixed(2);
    }

    get accuracy(){
        let acc = this.stats.total_shots_hit/this.stats.total_shots_fired;
        return acc.toFixed(2)*100.0;
    }

    get hs_percentage(){
        let hs = this.stats.total_kills_headshot/this.stats.total_kills;
        return hs.toFixed(2)*100.0;
    }

    get time_played(){
        //idk if this is right but it should return the hours.
        let time = (this.stats.total_time_played/60)/60;
        return time.toFixed(2);
    }

}

module.exports = UserStats;
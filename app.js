new Vue ({
  el : '#app',
  data : {
    start : true,
    lifePlayer : 100,
    lifeMonster : 100,
    Winner : false,
    logs : []
  },
  methods: {
    attack(){
      if(this.verifyLife){
        damageMonster = this.calculateDamage() + 2
        damagePlayer = this.calculateDamage()
        this.lifePlayer -= damageMonster
        this.lifeMonster -= damagePlayer
        this.logs.push({type:'monster', damage : damageMonster})
        this.logs.push({type:'player', damage : damagePlayer})
        this.aWinner()
        this.lifeFinish()
      }
    },
    attackSpecial(){
      if(this.verifyLife){
        damageMonster = this.calculateDamage()
        damagePlayer = this.calculateDamage() + 2
        this.lifePlayer -= damageMonster
        this.lifeMonster -= damagePlayer
        this.logs.push({type:'monster', damage : damageMonster})
        this.logs.push({type:'player', damage : damagePlayer})
        this.aWinner()
        this.lifeFinish()
      }
    },
    heal(){
      heal = this.calculateDamage()
      damageMonster = this.calculateDamage()
      this.lifePlayer -= damageMonster
      if((this.lifePlayer + heal) >= 100){
        this.lifePlayer = 100
      } else {
        this.lifePlayer += heal + 2
      }
      this.logs.push({type:'monster', damage : damageMonster})
      this.logs.push({type:'heal', damage : heal+2})
      
    },
    verifyLife(){
      if(this.lifeMonster > 0 || this.lifePlayer > 0){
        return true
      }else {
        return false
      }
    },
    calculateDamage(){
      calculate = Math.round(Math.random()*10)

      while(calculate == 0){
        calculate = Math.round(Math.random()*10)
      }

      return calculate
    },
    begin(){
      if(!this.start){
        this.logs = []
        this.lifePlayer = 100
        this.lifeMonster = 100
        this.start = true
        this.Winner = false
      } else {
        this.Winner = true
        this.start = false
      }
    },
    aWinner(){
      if(this.lifePlayer <= 0 || this.lifeMonster <=0){
        this.Winner = true
      }else{
        this.Winner = false
      }
    },
    lifeFinish(){
      if(this.lifeMonster <= 0) {
        this.lifeMonster = 0
      } if(this.lifePlayer <= 0) {
        this.lifePlayer = 0
      }
    }
  }
})
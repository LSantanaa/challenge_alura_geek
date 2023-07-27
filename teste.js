function solution(s){
  console.log( (s+"_").match(/.{2}/g)||[])
}

solution('abc')
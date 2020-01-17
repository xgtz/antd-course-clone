const random_jokes =[
    {
        setup: 'What is the object oriented way to get wealthy ?',
          punchline: 'Inheritance',
      },
      {
        setup: 'To understand what recursion is...',
        punchline: "You must first understand what recursion is",
      },
      {
        setup: 'What do you call a factory that sells passable products?',
        punchline: 'A satisfactory',
      },
];


let random_joke_call_count = 0;

export default {
    'get /dev/random_joke': function(req,res){
        //console.log('2222');
        const responseObj = random_jokes[ random_joke_call_count % random_jokes.length];
        random_joke_call_count +=1;
        // setTimeout(()=>{
        //     res.json(res);
        // },3000);

        setTimeout(()=>{
            res.json(responseObj);
        },3000);
    },
    'get /api/random_joke': {
        setup: 'What do you call a factory that sells passable products?',
        punchline: 'A satisfactory',
    }
}

//Rotation of conditions (key press to circle/square)
const key_targets = _.shuffle(['circle', 'square']);
const p_target = key_targets[0];
const q_target = key_targets[1];


//Error feedback if participants exceeds the time for responding 
 const count_time = function(data, next) {
     if (typeof window.timeout === 'undefined'){
         window.timeout = [];
     }
     // clear old timeouts and remove them from the timeout array
     clearTimeout(window.timeout[0]);
     window.timeout.shift();
     // add the timeout to the timeoutarray 
     window.timeout.push(setTimeout(function(){
         alert("You take too long");
     }, 1000));
 };

//practice condition
const practice =  {
	  circle: [
        {
            key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'circle' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'blue',
                focalShape: 'circle',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'focal',
                otherShape: 'square',
                otherColor: 'white',
                sort: 'split_grid'
			}
        },
        {
            key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'circle' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'white',
                focalShape: 'square',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'focal',
                otherShape: 'circle',
                otherColor: 'blue',
                sort: 'split_grid'
			}
        }
	  ],
	  square: [
		{
			key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'square' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'blue',
                focalShape: 'square',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'other',
                otherShape: 'circle',
                otherColor: 'white',
                sort: 'split_grid'
			}
		},
		{
			key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'square' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'white',
                focalShape: 'square',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'other',
                otherShape: 'square',
                otherColor: 'blue',
                sort: 'split_grid'
			}
		}
	  ]
 };


//test condition
const test =  {
	circle: [
        {
            key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'circle' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'blue',
                focalShape: 'circle',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'focal',
                otherShape: 'square',
                otherColor: 'white',
                sort: 'split_grid'
			}
        },
        {
            key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'circle' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'white',
                focalShape: 'square',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'focal',
                otherShape: 'circle',
                otherColor: 'blue',
                sort: 'split_grid'
			}
        }
	],
	square: [
		{
			key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'square' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'blue',
                focalShape: 'square',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'other',
                otherShape: 'circle',
                otherColor: 'white',
                sort: 'split_grid'
			}
		},
		{
			key1: 'q',
            key2: 'p',
			q: q_target,
			p: p_target,
			expected: 'square' === p_target? p_target : q_target,
			canvas: {
                focalColor: 'white',
                focalShape: 'circle',
                focalNumber: 1,
                elemSize: 100,
                total: 2,
                start_with: 'other',
                otherShape: 'square',
                otherColor: 'blue',
                sort: 'split_grid'
			}
		}
	]
 };


//loops and randomisation of trials
 const simonTask_info = {
    keyPress_test:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(practice.circle, 2), babeUtils.views.loop(practice.square,2)],2))
    ,
    keyPress_practice:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(practice.circle, 2), babeUtils.views.loop(practice.square,2)],5))
};

simonTask_info.keyPress_test = _.shuffle(simonTask_info.keyPress_test)
simonTask_info.keyPress_practice = _.shuffle(simonTask_info.keyPress_practice)



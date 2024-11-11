import { _vals, _probs, _ambigs, ITIs_norm5SD75 as ITIs } from "./paramPrep.js";

function randperm(n) {
    return Array
        .from({ length: n }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
}

function permuteArray(arr, perm) {
    return Array.from({ length: arr.length }, (_, i) => arr[perm[i] - 1]);
}

// paramPrep = [vals probs ambigs]

/////This part computed [vals probs ambigs], the matrix is converted and saved as paramPrep.json
// n_repeats=1;
// riskyVals=[5,6,7,8,9,10,12,14,16,18,20,23,26,30,34,39,44,50,57,66];
// riskyProbs=[0.75,0.5,0.25];
// [valsR, probs, repeat]=ndgrid(riskyVals,riskyProbs, 1:n_repeats);

// ambigVals=[5,6,7,8,9,10,12,14,16,18,20,23,26,30,34,39,44,50,57,66];
// ambigLevels=[0.24,0.5,0.74];
// [valsA, ambigs, repeat]=ndgrid(ambigVals,ambigLevels, 1:n_repeats);

const colorIndex1=[1, 2, 5, 6, 7, 11, 14, 15, 18, 20];
// const colorIndex2=[3, 4, 8, 9, 10, 12, 13, 16, 17, 19];
//paramPrep=[vals probs ambigs shufColors' randperm(length(vals))'];

var colors = [];

for (var T = 0; T < 6; ++ T) {
    let assocColorIndex = randperm(2);
    for (var i = 0; i < 20; ++ i) {
        if (colorIndex1.findIndex(el => el == i+1) != -1)
            colors.push(assocColorIndex[1]);
        else
            colors.push(assocColorIndex[0]);
    }
}

var shufPermutation = randperm(120);

var vals = permuteArray(_vals, shufPermutation);
var probs = permuteArray(_probs, shufPermutation);
var ambigs = permuteArray(_ambigs, shufPermutation);
var colors = permuteArray(colors, shufPermutation);

var Data = {
    vals: [],
    probs: [],
    ambigs: [],
    colors: [],
    ITIs: []
};

var tmpColors = randperm(2).concat(randperm(2));

for (var block = 0; block < 4; ++ block) {
    Data.vals.push(4);
    Data.probs.push(.5);
    Data.ambigs.push(0);
    Data.colors.push(tmpColors[block]);
    Data.ITIs.push(10);

    Data.vals = Data.vals.concat(vals.slice(block * 30, (block + 1) * 30));
    Data.probs = Data.probs.concat(probs.slice(block * 30, (block + 1) * 30));
    Data.ambigs = Data.ambigs.concat(ambigs.slice(block * 30, (block + 1) * 30));
    Data.colors = Data.colors.concat(colors.slice(block * 30, (block + 1) * 30));

    let permuted = randperm(30);
    Data.ITIs = Data.ITIs.concat(Array.from({ length: 30 }, (_, i) => ITIs[permuted[i]-1]));
}

export { Data }
function randperm(n) {
    let permutation = Array
        .from({ length: n }, (_, i) => i + 1);

    permutation
        .sort(() => Math.random() - 0.5);

    return permutation;
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

colorIndex1=[1, 2, 5, 6, 7, 11, 14, 15, 18, 20];
colorIndex2=[3, 4, 8, 9, 10, 12, 13, 16, 17, 19];
//paramPrep=[vals probs ambigs shufColors' randperm(length(vals))'];

const constants = require("constants");

function createBodyPartBalanceItem(part, weight, required = true) {
    return {
        part,
        weight,
        required
    };
}

function canCalculateBodyParts(bodyPartBalance, budget) {

    const minCost = bodyPartBalance.reduce((result, next) => {
        if (next.required) {
            result += BODYPART_COST[next.part];
        }
        return result;
    }, 0);

    return minCost < budget;

}

function calculateBodyParts(bodyPartBalance, budget) {

    const maxWeight     = bodyPartBalance.reduce((result, next) => next.weight > result ? next.weight : result, 0);
    const iteratorStack = bodyPartBalance.map(balancePart => {
        return {
            part: balancePart.part,
            weight: balancePart.weight,
            counter: balancePart.required ? 1 : 0
        };
    });

    const bodyParts = [];
    let costs       = 0;

    bodyPartIteration:
    while (bodyParts.length < constants.BODY_PART_LIMIT) {

        for (let i = 0; i < iteratorStack.length; i++) {

            const stack = iteratorStack[i];

            if (stack.counter >= 1) {

                costs += BODYPART_COST[stack.part];

                if (costs > budget) {
                    break bodyPartIteration;
                }

                bodyParts.push(stack.part);
                stack.counter--;

            }

            stack.counter += stack.weight / maxWeight;

        }

    }

    return bodyParts;

}

module.exports = {
    canCalculateBodyParts,
    calculateBodyParts,
    createBodyPartBalanceItem
};
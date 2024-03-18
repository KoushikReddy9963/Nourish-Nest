const form = document.getElementById('bmrForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);

    if (gender === '') {
        alert('Please select your gender.');
        return;
    }

    const bmr = calculateBMR(gender, weight, height, age);
    const calorieNeed = calculateCalorieNeed(bmr, activityLevel);

    resultDiv.innerHTML = `<p>Your Basal Metabolic Rate (BMR) is: <strong>${bmr.toFixed(0)} Calories/day</strong></p>
                            <p>Your daily calorie need based on your activity level is: <strong>${calorieNeed.toFixed(0)} Calories/day</strong></p>`;
});

function calculateBMR(gender, weight, height, age) {
    if (gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

function calculateCalorieNeed(bmr, activityLevel) {
    return bmr * activityLevel;
}


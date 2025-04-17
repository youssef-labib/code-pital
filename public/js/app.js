//~ # Welcome to Codepital:

//? In this exercise, we have patients who will go to a doctor to get debugged. The doctor will diagnose them and prescribe a remedy. After that, the patients will go to the pharmacy to buy their remedy, take it, and be cured.

//! ## Description of patients:

//* Patients have a name, an illness, money, a pocket, a health condition, knowledge of how to go to a place, take medication, and pay. At the beginning, patients are in a waiting room.

//~ | Name      | Illness              | Money | Pocket | Health State | Treatment              | Go To | Take Care | Pay |
//~ |-----------|----------------------|-------|--------|--------------|------------------------|-------|-----------|-----|
//~ | Marcus    | Indentation Error    | 100   | Empty  | Ill          |                        |       |           |     |
//~ | Optimus   | Unsave               | 200   | Empty  | Ill          |                        |       |           |     |
//~ | Sangoku   | 404                  | 80    | Empty  | Ill          |                        |       |           |     |
//~ | DarthVader| Asthmatic            | 110   | Empty  | Ill          |                        |       |           |     |
//~ | Semicolon | Syntax Error         | 60    | Empty  | Ill          |                        |       |           |     |

//! ## Description of the doctor:

//* The doctor receives patients in his office. First, he diagnoses them and gets paid before prescribing a treatment. Note that the doctor always makes the patient leave his office before taking the next one. In his office, there is his Sphynx cat to maintain a sterile environment. The cat meows every two seconds in the console (bonus). The consultation costs 50€. Patients are in a treatment state before leaving the office.

//~ | Name      | Money | Office | Diagnosis | Patient In | Patient Out |
//~ |-----------|-------|--------|-----------|------------|-------------|
//~ | Debugger  | 0     |        |           |            |             |

//! ### Diagnosis Grid:

//~ | Illness            | Treatment           |
//~ |--------------------|---------------------|
//~ | Indentation Error  | `Ctrl+Shift+F`      |
//~ | Unsave             | `SaveOnFocusChange` |
//~ | 404                | `CheckLinkRelation` |
//~ | Asthmatic          | `Ventolin`          |
//~ | Syntax Error       | `F12+Doc`           |

//! ## The Pharmacy:

//* Patients will then go to the pharmacy and receive their treatment if they have enough money. If they have enough money, they will be in good health; otherwise, they will be dead, and you will need to push them into a cemetery.

//! ### Treatment Rates:

//~ | Treatment           | Price |
//~ |---------------------|-------|
//~ | `Ctrl+Shift+F`      | 60€   |
//~ | `SaveOnFocusChange` | 100€  |
//~ | `CheckLinkRelation` | 35€   |
//~ | `Ventolin`          | 40€   |
//~ | `F12+Doc`           | 20€   |

//! # Verification:

//~ Thanks to your debugger, follow the evolution of each patient. Make sure they leave the waiting room each time before entering the doctor's office, and they should leave the office before letting someone else enter.


class Patients {
    constructor(name, illness, money, pocket, healthState, treatment) {
        this.name = name
        this.illness = illness
        this.money = money
        this.pocket = pocket
        this.healthState = healthState
        this.treatment = treatment
    }
    goTo(location, oldLocation) {
        location.people.push(this)
        oldLocation.splice(this)
        console.log(`${this.name} moved from the Hospital to ${location.name}`);
    }

    pay() {
        for (let i = 0; i < pharmacy.treatment.length; i++) {
            if (this.treatment == pharmacy.treatment[i].treatment) {
                if (this.money >= pharmacy.treatment[i].price) {
                    this.money -= pharmacy.treatment[i].price
                    pharmacy.treatment[i].price += pharmacy.money
                    this.illness = "None"
                    this.healthState = "Well"
                    console.log(`${this.name} purchased a ${pharmacy.treatment[i].name} for ${pharmacy.treatment[i].price}$`);
                    console.log("He took the treatment and became well.");
                    break;
                } else {
                    cemetery.people.push(this)
                    // pharmacy.patient.splice(this, 1)
                    this.healthState = "Dead 💀"
                    console.log("RIP 💀");
                    break;
                }
            } 
        }
    }
}

let Marcus = new Patients("Marcus", "IndentationError", 100, [], "Ill", "");
let Optimus = new Patients("Optimus", "Unsave", 200, [], "Ill", "");
let Sangoku = new Patients("Sangoku", "404", 80, [], "Ill", "");
let DarthVader = new Patients("DarthVader", "Asthmatic", 110, [], "Ill", "");
let Semicolon = new Patients("Semicolon", "SyntaxError", 60, [], "Ill", "");

let diagnosisGrid = [
    {
        name: "IndentationError",
        treatment: "Ctrl+Shift+F",
        price: 60
    },
    {
        name: "Unsave",
        treatment: "SaveOnFocusChange",
        price: 100
    },
    {
        name: "404",
        treatment: "CheckLinkRelation",
        price: 60
    },
    {
        name: "Asthmatic",
        treatment: "Ventolin",
        price: 60
    },
    {
        name: "SyntaxError",
        treatment: "F12+Doc",
        price: 60
    },
];

class Doctor {
    constructor(name, money, office, waitingroom) {
        this.name = name
        this.money = money
        this.office = office
        this.waitingroom = waitingroom
    }
    Diagnosis(patient) {
        for (let index = 0; index < diagnosisGrid.length; index++) {
            if (patient.illness == diagnosisGrid[index].name) {
                console.log(`${patient.name} have ${diagnosisGrid[index].name} and he need to start taking ${diagnosisGrid[index].treatment}`);
                patient.treatment = diagnosisGrid[index].treatment
                break;
            }
        }
    }

    PatientIn(patient) {
        if (this.office.length == 0) {
            this.waitingroom.splice(patient, 1)
            this.office.push(patient)
            console.log(`${patient.name} entred the office.`);
        } else {
            console.log("Office is occupied.");
        }
    }


    PatientOut() {
        let patient = this.office[0]
        this.waitingroom.push(patient)
        this.office.pop()
        patient.money -= 50
        this.money += 50
        console.log(patient.name + " paid 50$ for the consultation and left the office.")
    }

}

let Debugger = new Doctor("Debugger", 0, [], [])

class Pharmacy {
    constructor(name, money, people, treatment) {
        this.name = name
        this.money = money
        this.people = people
        this.treatment = treatment
    }
}

//! its not the best practice
let pharmacy = new Pharmacy("Heaven Pharmacy", 0, [], diagnosisGrid)

class Cemetery {
    constructor(name, people) {
        this.name = name
        this.people = people
    }
}

let cemetery = new Cemetery("Hell Cemetry", [])


//^ ACTIONS:

Debugger.waitingroom.push(Marcus, Optimus, Sangoku, DarthVader, Semicolon)

//& Marcus

// console.table(Marcus);

Debugger.PatientIn(Marcus)

Debugger.Diagnosis(Marcus)

Debugger.PatientOut(Marcus)

// console.table(Marcus);

Marcus.goTo(pharmacy, Debugger.waitingroom)

Marcus.pay("IndentationError")

console.table(Marcus);

// console.table(Debugger.office);
// console.table(Debugger.waitingroom);

console.log("\n");

//& Optimus

// console.table(Optimus);

Debugger.PatientIn(Optimus)

Debugger.Diagnosis(Optimus)

Debugger.PatientOut(Optimus)

// console.table(Optimus);

Optimus.goTo(pharmacy, Debugger.waitingroom)

Optimus.pay("Unsave")

console.table(Optimus);

console.table(Debugger.office);
console.table(Debugger.waitingroom);

console.log("\n");

//& Sangoku

// console.table(Sangoku);

Debugger.PatientIn(Sangoku)

Debugger.Diagnosis(Sangoku)

Debugger.PatientOut(Sangoku)

// console.table(Sangoku);

Sangoku.goTo(pharmacy, Debugger.waitingroom)

Sangoku.pay("404")

console.table(Sangoku);

// console.table(Debugger.office);
// console.table(Debugger.waitingroom);

console.log("\n");

//& DarthVader

// console.table(DarthVader);

Debugger.PatientIn(DarthVader)

Debugger.Diagnosis(DarthVader)

Debugger.PatientOut(DarthVader)

// console.table(DarthVader);

DarthVader.goTo(pharmacy, Debugger.waitingroom)

DarthVader.pay("Asthmatic")

console.table(DarthVader);

// console.table(Debugger.office);
// console.table(Debugger.waitingroom);

console.log("\n");

//& Semicolon

// console.table(Semicolon);

Debugger.PatientIn(Semicolon)

Debugger.Diagnosis(Semicolon)

Debugger.PatientOut(Semicolon)

// console.table(Semicolon);

Semicolon.goTo(pharmacy, Debugger.waitingroom)

Semicolon.pay("SyntaxError")

console.table(Semicolon);

// console.table(Debugger.office);
// console.table(Debugger.waitingroom);

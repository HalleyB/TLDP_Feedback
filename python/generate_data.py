from faker import Faker
from datetime import datetime
from random import randint, seed
import csv
import json

fake = Faker()
seed(8)

word_list = ["Friendly", "Natural", "Optimistic", "Jubilant", "Generous", "Instantaneous", "Good",
    "Nurturing", "Nutritious", "Creative", "Superb", "Amazing", "Quiet", "Divine", "Thriving",
    "Honest", "Handsome", "Okay", "Celebrated", "Simple", "Distinguished", "Thrilling", "Marvelous",
    "Harmonious", "Enthusiastic", "Victory", "Imaginative", "Brave", "Robust", "Acclaimed", "Popular",
    "Meritorious", "Bounty", "Right", "Genius", "Instinctive", "Heavenly", "Novel", "Independent",
    "Inventive", "Bountiful", "Rewarding", "Effervescent", "Trusting", "Effective", "Transforming",
    "Efficient", "Truthful", "Calm", "Seemly", "Agreeable", "Quick", "Lucky", "Lucid", "Choice",
    "Special", "Energetic", "Valued", "Classic", "Spirited", "Cute", "Supporting", "Honorable",
    "Ideal", "Agree", "Quality", "Plentiful", "Perfect", "Masterful", "Joy", "Healing", "Genuine",
    "Intellectual", "Endorsed", "Upstanding", "Ethical", "Vital", "Paradise", "Fetching", "Worthy",
    "Excellent", "Vivacious", "Charming", "Soulful", "Honored", "Cool", "Sunny", "Glamorous", "Innovate",
    "Impressive", "Intuitive", "Hearty", "Innovative", "Bliss", "Reward", "Believe", "Respected", "Clean",
    "Stirring", "Pleasant", "Electrifying", "Unwavering", "Constant", "Successful", "Nice", "Composed",
    "Stupendous", "Meaningful", "Imagine", "Intelligent", "Gorgeous", "Active", "Principled", "Lively",
    "Luminous", "Growing", "Delight", "Terrific", "Accomplish", "Positive", "Classical", "Spiritual",
    "One", "Familiar", "Wholesome", "Hug", "Great", "Fabulous", "Well", "Learned", "Champ", "Skillful",
    "Accepted", "Laugh", "Polished", "Enchanting", "Upbeat", "Keen", "Absolutely", "Poised", "Delightful",
    "Thorough", "Idea", "Fun", "Flourishing", "Yummy", "Now", "Easy", "Tranquil", "Earnest", "Tops",
    "One-hundred percent", "Esteemed", "Virtuous", "Bravo", "Safe", "Affirmative", "Protected", "Angelic",
    "Ready", "Adventure", "Prominent", "Light", "Affluent", "Proud", "Action", "Pretty", "Cheery",
    "Sparkling", "Fantastic", "Wonderful", "Healthy", "Engaging", "Victorious", "Appealing", "Reassuring",
    "Moving", "Giving", "Merit", "Approve", "Refined", "Funny", "Brilliant", "Satisfactory", "Adorable",
    "Progress", "Achievement", "Ecstatic", "Prepared", "Transformative", "Knowing", "Aptitude", "Refreshing",
    "Attractive", "Rejoice", "Awesome", "Reliable", "Pleasurable", "Motivating", "Miraculous", "Lovely",
    "Beautiful", "Resounding", "Beaming", "Remarkable", "Exciting", "Wealthy", "Champion", "Smile",
    "Beneficial", "Restored", "Graceful", "Fine", "Wow", "Bubbly", "Secure", "Fortunate", "Zeal",
    "Kind", "Courageous", "Abrasive", "Apathetic", "Controlling", "Dishonest", "Impatient", "Anxious", "Betrayed", "Disappointed",
    "Embarrassed", "Jealous", "Abysmal", "Bad", "Callous", "Corrosive", "Damage", "Despicable", "Don’t", "Enraged",
    "Fail", "Gawky", "Haggard", "Hurt", "Icky", "Insane", "Jealous", "Lose", "Malicious", "Naive", "Not", "Objectionable",
    "Pain", "Questionable", "Reject", "Rude", "Sad", "Sinister", "Stuck", "Tense", "Ugly", "Unsightly", "Vice", "Wary",
    "Yell", "Zero", "Adverse", "Banal", "Can’t", "Corrupt", "Damaging", "Detrimental", "Dreadful", "Eroding", "Faulty",
    "Ghastly", "Hard", "Hurtful", "Ignorant", "Insidious", "Junky", "Lousy", "Mean", "Nasty", "Noxious", "Odious",
    "Perturb", "Quirky", "Renege", "Ruthless", "Savage", "Slimy", "Stupid", "Terrible", "Undermine", "Untoward", "Vicious",
    "Weary", "Yucky", "Alarming", "Barbed", "Clumsy", "Dastardly", "Dirty", "Dreary", "Evil", "Fear", "Grave",
    "Hard-hearted", "Ignore", "Injure", "Insipid", "Lumpy", "Menacing", "Naughty", "None", "Offensive", "Pessimistic",
    "Quit", "Repellant", "Scare", "Smelly", "Substandard", "Terrifying", "Unfair", "Unwanted", "Vile", "Wicked", "Angry",
    "Belligerent", "Coarse", "Crazy", "Dead", "Disease", "Feeble", "Greed", "Harmful", "Ill", "Injurious", "Messy",
    "Negate", "No one", "Old", "Petty", "Reptilian", "Scary", "Sobbing", "Suspect", "Threatening", "Unfavorable",
    "Unwelcome", "Villainous", "Woeful", "Annoy", "Bemoan", "Cold", "Creepy", "Decaying", "Disgusting", "Fight", "Grim",
    "Hate", "Immature", "Misshapen", "Negative", "Nothing", "Oppressive", "Plain", "Repugnant", "Scream", "Sorry",
    "Suspicious", "Unhappy", "Unwholesome", "Vindictive", "Worthless", "Anxious", "Beneath", "Cold-hearted", "Criminal",
    "Deformed", "Disheveled", "Filthy", "Grimace", "Hideous", "Imperfect", "Missing", "Never", "Neither", "Poisonous",
    "Repulsive", "Severe", "Spiteful", "Unhealthy", "Unwieldy", "Wound", "Apathy", "Boring", "Collapse", "Cruel", "Deny",
    "Dishonest", "Foul", "Gross", "Homely", "Impossible", "Misunderstood", "No", "Nowhere", "Poor", "Revenge", "Shocking",
    "Sticky", "Unjust", "Unwise", "Appalling", "Broken", "Confused", "Cry", "Deplorable", "Dishonorable", "Frighten",
    "Grotesque", "Horrendous", "Inane", "Moan", "Nobody", "Prejudice", "Revolting", "Shoddy", "Stinky", "Unlucky", "Upset",
    "Atrocious", "Contrary", "Cutting", "Depressed", "Dismal", "Frightful", "Gruesome", "Horrible", "Inelegant",
    "husband", "respond", "baby", "college", "economic", "process", "attack", "fire", "serious", "product",
    "interest", "return", "staff", "appear", "film", "factor", "other", "physical", "early", "love", "matter",
    "school", "company", "exist", "student", "road", "meet", "recent", "decision", "note", "store", "face",
    "grow", "sell", "record", "hour", "job", "experience", "rock", "point", "consider", "leader", "paper",
    "below", "food", "develop", "day", "chair", "total", "peace", "hospital", "style", "teacher", "wing",
    "moment", "short", "power", "film", "wait", "attack", "defense", "mention", "model", "million", "support",
    "challenge", "nice", "age", "hang", "sound", "husband", "reality", "create", "sell", "yourself", "pull",
    "sure", "heart", "husband", "operation", "thank", "talk", "clear", "prepare", "course", "ball", "short",
    "discover", "lead", "course", "bank", "school", "next", "hit", "son", "trial", "job", "view", "news",
    "organization", "central", "discover", "red", "each", "base", "test", "significant", "strategy", "national",
    "movie", "sister", "special", "raise", "store", "data", "use", "employee", "word", "church", "dream",
    "reason", "stage", "letter", "race", "suggest", "low", "summer", "any", "thank", "experience", "financial",
    "beautiful", "its", "especially", "structure", "hang", "image", "threat", "heavy", "recent", "agree",
    "describe", "teacher", "tree", "gender", "problem", "perform", "conference", "science", "mind", "none",
    "student", "group", "good", "throw", "win", "second", "find", "movement", "actually", "shake", "sign",
    "deep", "teach", "sell", "single", "bill", "different", "politics", "visit", "executive", "son", "card",
    "dream", "term", "box", "design", "big", "lie", "view", "explain", "effort", "start", "key", "picture",
    "say", "house", "mention", "kid", "evening", "wish", "summer", "institution", "control", "necessary",
    "station", "teach", "factor", "kind", "hit", "garden", "event", "remove", "raise", "young", "seat", "war",
    "main", "trip", "fire", "special", "organization", "situation", "police", "list", "street", "picture",
    "economic", "force", "role", "less", "artist", "while", "poor", "above", "many", "blood", "door", "strong",
    "cultural", "purpose", "include", "become", "practice", "pressure", "truth", "loss", "guy", "nice",
    "general", "full", "allow", "nature", "water", "discuss", "across", "price", "student", "artist", "teacher",
    "force", "decision", "particularly", "find", "room", "join", "material", "film", "term", "write",
    "patient", "worker", "door", "will", "near", "ever", "measure", "apply", "field", "environmental",
    "professor", "anyone", "soldier", "protect", "perform", "strong", "pass", "phone", "response", "attack",
    "cost", "brother", "hotel", "science", "ability", "performance", "sit", "good", "edge", "reality", "cold",
    "treat", "newspaper", "anyone", "subject", "suggest", "safe", "vote", "include", "view", "strong", "note",
    "rate", "price", "sound", "officer", "suggest", "themselves", "religious", "trade", "develop", "available",
    "outside", "shoulder", "run", "character", "color", "item", "social", "nature", "case", "material",
    "raise", "hotel", "themselves", "recognize", "hospital", "charge", "dream", "die", "military", "above",
    "event", "specific", "response", "analysis", "chair", "far", "beat"
]


Faker.seed(0)
profiles = []
for x in range(1000):
    profiles.append(fake.simple_profile())
    del(profiles[x]['birthdate'])


Faker.seed(0)
dates = []
for x in range(1000):
    dates.append(fake.date_between_dates(date_start=datetime.strptime('01-01-2021', '%m-%d-%Y').date(), date_end=datetime.strptime('12-31-2021', '%m-%d-%Y').date()))


Faker.seed(0)
gen_p = []
for x in range(1000):
    feedback = fake.paragraph(nb_sentences=3, ext_word_list=word_list)
    gen_p.append(feedback)



OUTPUT_FILE = 'feedback_data.csv'
header = ['feedback_id', 'manager_id', 'date', 'employee_id', 'feedback']
NUM_ROWS = 1000
data_rows = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    feedback_id = i
    manager_id = randint(9001, 9005)
    timestamp = dates[i-1]
    employee_id = randint(6, 1000)
    feedback = gen_p[i-1]


    # Create the data row
    data_row = [
        feedback_id,
        manager_id,
        timestamp.strftime("%Y-%m-%d"),
        employee_id,
        feedback
    ]

    # Add the data row to the list
    data_rows.append(data_row)

with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(header)
    writer.writerows(data_rows)

print("Feedback generation complete!")

OUTPUT_FILE = 'employee_data.json'
header = ['employee_id', 'employee_info', 'is_manager', 'manager_id']
NUM_ROWS = 1000
data_rows = []
for i in range(1, NUM_ROWS + 1):
    if i <= 5:
        employee_id = i + 9000
        is_manager = True
        manager_id = None
    else:
        employee_id = i
        is_manager = False
        manager_id = randint(1, 5) + 9000
    
    employee_info = profiles[i-1]


    # Create the data row
    data_row = {
        'employee_id': employee_id,
        'employee_info': dict(employee_info),
        'is_manager': is_manager,
        'manager_id': manager_id
    }

    # Add the data row to the list
    data_rows.append(data_row)


with open(OUTPUT_FILE, "w") as file:
    json.dump(data_rows, file)

print('Employee data generated!')
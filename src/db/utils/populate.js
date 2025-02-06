import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Directly use the provided database URL
const sql = neon(DATABASE_URL);

// Initialize drizzle with the connection
export const db = drizzle({ client: sql });

// Import schema
import {
    persons,
    events,
    eventWinners,
    officeBearers,
    galleryImages,
    contactSubmissions,
    adminUsers
} from '../schema.js'; // Adjust the path to your schema


async function insertData() {
    try {
        // Insert Persons
        const [alice, bob, charlie] = await db.insert(persons).values([
            {
                name: 'Alice Johnson',
                registerNumber: 'REG12345',
                department: 'CSE',
                batch: '2024',
                email: 'alice@example.com',
                contactNumber: '1234567890',
                profileImage: 'https://drive.google.com/uc?id=1Om1ueC9LaUl4Hhp8ZFhY2REVs4BsdPFN',
                totalEventPoints: 50,
                socialLinks: { linkedin: 'https://linkedin.com/alice' },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Bob Smith',
                registerNumber: 'REG54321',
                department: 'ECE',
                batch: '2023',
                email: 'bob@example.com',
                contactNumber: '0987654321',
                profileImage: 'https://drive.google.com/uc?id=1NzJvjn-lvnBh-a9nOSM-WKdweKARHjFO',
                totalEventPoints: 40,
                socialLinks: { github: 'https://github.com/bobsmith' },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Charlie Brown',
                registerNumber: 'REG98765',
                department: 'IT',
                batch: '2025',
                email: 'charlie@example.com',
                contactNumber: '1122334455',
                profileImage: 'https://drive.google.com/uc?id=16flFSliXzvgTuTe-mu11RVoOL7Q_obC8',
                totalEventPoints: 30,
                socialLinks: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]).returning();

        // Insert Events
        const [codingContest, quizChampionship, hackathon] = await db.insert(events).values([
            {
                name: 'Coding Contest',
                description: 'A contest for coders.',
                date: '2024-01-15',
                year: '2024',
                status: 'upcoming',
                registrationLink: 'https://example.com/coding-contest',
                conductedBy: 'IEEE',
                teamSizeMin: 1,
                teamSizeMax: 4,
                eventImage: 'https://drive.google.com/uc?id=1Om1ueC9LaUl4Hhp8ZFhY2REVs4BsdPFN',
            },
            {
                name: 'Quiz Championship',
                description: 'A championship for quiz enthusiasts.',
                date: '2024-02-10',
                year: '2024',
                status: 'upcoming',
                registrationLink: 'https://example.com/quiz-championship',
                conductedBy: 'Rotary',
                teamSizeMin: 2,
                teamSizeMax: 3,
                eventImage: 'https://drive.google.com/uc?id=1Om1ueC9LaUl4Hhp8ZFhY2REVs4BsdPFN',
            },
            {
                name: 'Hackathon',
                description: '24-hour hackathon event.',
                date: '2024-03-20',
                year: '2024',
                status: 'upcoming',
                registrationLink: 'https://example.com/hackathon',
                conductedBy: 'CSEA',
                teamSizeMin: 2,
                teamSizeMax: 5,
                eventImage: 'https://drive.google.com/uc?id=1Om1ueC9LaUl4Hhp8ZFhY2REVs4BsdPFN',
            },
        ]).returning();

        // Insert Event Winners
        await db.insert(eventWinners).values([
            {
                eventId: codingContest.id,
                personId: alice.id,
                rank: 'first',
                pointsEarned: 20,
                year: '2024',
            },
            {
                eventId: quizChampionship.id,
                personId: bob.id,
                rank: 'second',
                pointsEarned: 15,
                year: '2024',
            },
            {
                eventId: hackathon.id,
                personId: charlie.id,
                rank: 'third',
                pointsEarned: 10,
                year: '2024',
            },
        ]);

        // Insert Office Bearers
        await db.insert(officeBearers).values([
            {
                personId: alice.id,
                position: 'President',
                startYear: '2023',
                endYear: '2024',
                isCurrent: true,
                profileImage: 'https://drive.google.com/uc?id=1Om1ueC9LaUl4Hhp8ZFhY2REVs4BsdPFN',
            },
            {
                personId: bob.id,
                position: 'Vice President',
                startYear: '2023',
                endYear: '2024',
                isCurrent: true,
                profileImage: 'https://drive.google.com/uc?id=1NzJvjn-lvnBh-a9nOSM-WKdweKARHjFO',
            },
            {
                personId: charlie.id,
                position: 'Secretary',
                startYear: '2022',
                endYear: '2023',
                isCurrent: false,
                profileImage: 'https://drive.google.com/uc?id=16flFSliXzvgTuTe-mu11RVoOL7Q_obC8',
            },
        ]);

        // Insert Gallery Images
        await db.insert(galleryImages).values([
            {
                imageUrl: 'https://drive.google.com/uc?id=1Om1ueC9LaUl4Hhp8ZFhY2REVs4BsdPFN',
                academicYear: '2023-2024',
                description: 'Coding event image.',
                tags: ['coding', 'event'],
                in_carousal: true,
            },
            {
                imageUrl: 'https://drive.google.com/uc?id=1NzJvjn-lvnBh-a9nOSM-WKdweKARHjFO',
                academicYear: '2022-2023',
                description: 'Quiz event image.',
                tags: ['quiz', 'competition'],
                in_carousal: false,
            },
            {
                imageUrl: 'https://drive.google.com/uc?id=16flFSliXzvgTuTe-mu11RVoOL7Q_obC8',
                academicYear: '2021-2022',
                description: 'Hackathon event image.',
                tags: ['hackathon', 'coding'],
                in_carousal: true,
            },
            {
                imageUrl: 'https://drive.google.com/uc?id=1vvAWwVk6pofVMFHeyolZwdeVJykWBkMn',
                academicYear: '2020-2021',
                description: 'General event image.',
                tags: ['event'],
                in_carousal: false,
            },
        ]);

        // Insert Contact Submissions
        await db.insert(contactSubmissions).values([
            {
                name: 'David Miller',
                email: 'david@example.com',
                subject: 'General Inquiry',
                message: 'I would like to know more about your events.',
            },
            {
                name: 'Emily Clark',
                email: 'emily@example.com',
                subject: 'Event Registration',
                message: 'I want to register for the coding contest.',
            },
            {
                name: 'Frank Wilson',
                email: 'frank@example.com',
                subject: 'Feedback',
                message: 'Great event! Looking forward to more.',
            },
        ]);

        // Insert Admin Users
        await db.insert(adminUsers).values([
            {
                username: 'admin1',
                hashedPassword: 'hashed_password_1', // Replace with actual hashed password
                role: 'super_admin',
            },
            {
                username: 'editor1',
                hashedPassword: 'hashed_password_2',
                role: 'editor',
            },
            {
                username: 'viewer1',
                hashedPassword: 'hashed_password_3',
                role: 'viewer',
            },
        ]);

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

insertData();

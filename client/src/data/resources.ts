
import { Subject, ResourceCategory } from '../types';

export const RESOURCES_DATA: Record<Subject, ResourceCategory[]> = {
    Math: [
        {
            name: "Core Calculus Concepts",
            resources: [
                { title: "Khan Academy: Calculus I", description: "Comprehensive video tutorials and practice problems for all of Calculus I.", url: "https://www.khanacademy.org/math/calculus-1", type: "video" },
                { title: "Paul's Online Math Notes", description: "In-depth notes, tutorials, and cheat sheets for algebra, calculus, and differential equations.", url: "https://tutorial.math.lamar.edu/", type: "article" },
                { title: "3Blue1Brown: Essence of Calculus", description: "An intuitive, visual approach to understanding the core ideas of calculus.", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", type: "video" },
            ]
        },
        {
            name: "Linear Algebra Resources",
            resources: [
                { title: "MIT OpenCourseWare: Linear Algebra", description: "Full course lectures from MIT's renowned Gilbert Strang.", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "video" },
                { title: "Interactive Linear Algebra", description: "A beautiful, interactive online textbook for linear algebra.", url: "https://textbooks.math.gatech.edu/ila/index.html", type: "interactive" },
            ]
        },
    ],
    Physics: [
        {
            name: "Fundamental Physics",
            resources: [
                { title: "The Feynman Lectures on Physics", description: "The legendary, timeless lectures by Richard Feynman, available online for free.", url: "https://www.feynmanlectures.caltech.edu/", type: "book" },
                { title: "HyperPhysics", description: "A concept-map-based exploration of physics concepts.", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/index.html", type: "article" },
                { title: "PhET Interactive Simulations", description: "Fun, interactive, research-based simulations of physical phenomena.", url: "https://phet.colorado.edu/en/simulations/filter?subjects=physics&sort=alpha&view=grid", type: "interactive" },
            ]
        },
        {
            name: "Electromagnetism Explained",
            resources: [
                { title: "Walter Lewin's Lectures (8.02x)", description: "Famous for his engaging style, Prof. Lewin makes E&M exciting.", url: "https://www.youtube.com/playlist?list=PLyQSN7X0ro2314mKyUiOILaOC2hk6Pc3j", type: "video" },
            ]
        },
    ],
    Chemistry: [
        {
            name: "General & Organic Chemistry",
            resources: [
                { title: "Khan Academy: Organic Chemistry", description: "A complete course on the fundamentals of organic chemistry.", url: "https://www.khanacademy.org/science/organic-chemistry", type: "video" },
                { title: "ACS: Chemistry for Life", description: "Resources and articles from the American Chemical Society.", url: "https://www.acs.org/education.html", type: "article" },
                { title: "MolView", description: "An intuitive, web-based molecular viewer and editor.", url: "https://molview.org/", type: "interactive" },
            ]
        },
    ],
    CS: [
        {
            name: "Algorithms & Data Structures",
            resources: [
                { title: "VisuAlgo", description: "Visualize data structures and algorithms through animation.", url: "https://visualgo.net/en", type: "interactive" },
                { title: "GeeksforGeeks", description: "A vast library of articles, tutorials, and practice problems for almost any CS topic.", url: "https://www.geeksforgeeks.org/data-structures/", type: "article" },
                { title: "Introduction to Algorithms (CLRS)", description: "The essential, comprehensive textbook for serious algorithm study.", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", type: "book" },
            ]
        },
        {
            name: "Core CS Concepts",
            resources: [
                { title: "Crash Course: Computer Science", description: "A fun, fast-paced video series covering the history and fundamentals of computer science.", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo", type: "video" },
                { title: "Roadmap.sh", description: "Community-curated roadmaps, study plans, and paths to becoming a developer.", url: "https://roadmap.sh/", type: "article" },
            ]
        },
    ],
    Biology: [
        {
            name: "Core Biology",
            resources: [
                { title: "Khan Academy: Biology", description: "Full video courses on all major biology topics.", url: "https://www.khanacademy.org/science/biology", type: "video" },
                { title: "Biology LibreTexts", description: "A comprehensive online textbook library for biology.", url: "https://bio.libretexts.org/", type: "book" },
            ]
        }
    ],
    Economics: [
        {
            name: "Economics Principles",
            resources: [
                { title: "Investopedia", description: "An incredible resource for all economic and financial terms and concepts.", url: "https://www.investopedia.com/", type: "article" },
                { title: "Khan Academy: Macroeconomics", description: "Learn about economic indicators, monetary and fiscal policy, and more.", url: "https://www.khanacademy.org/economics-finance-domain/macroeconomics", type: "video" },
            ]
        }
    ],
    'Business Studies': [
        {
            name: "Business Fundamentals",
            resources: [
                { title: "Harvard Business Review", description: "Articles and case studies on business strategy and management.", url: "https://hbr.org/", type: "article" },
                { title: "Khan Academy: Entrepreneurship", description: "Learn about the life cycle of a business.", url: "https://www.khanacademy.org/economics-finance-domain/entrepreneurship2", type: "video" },
            ]
        }
    ],
    Accountancy: [
         {
            name: "Accounting Basics",
            resources: [
                { title: "AccountingCoach", description: "Free online courses and materials to learn accounting.", url: "https://www.accountingcoach.com/", type: "article" },
                 { title: "Principles of Accounting", description: "A complete online textbook for financial and managerial accounting.", url: "https://www.principlesofaccounting.com/", type: "book" },
            ]
        }
    ],
    History: [
        {
            name: "World History Archives",
            resources: [
                { title: "Crash Course: World History", description: "Engaging and fast-paced videos covering the span of world history.", url: "https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9", type: "video" },
                { title: "World History Encyclopedia", description: "Peer-reviewed articles on all aspects of world history.", url: "https://www.worldhistory.org/", type: "article" },
            ]
        }
    ],
    Geography: [
        {
            name: "Geography Explained",
            resources: [
                { title: "National Geographic", description: "Explore the world through articles, videos, and photography.", url: "https://www.nationalgeographic.com/", type: "article" },
                { title: "Google Earth", description: "The ultimate interactive map to explore the planet.", url: "https://earth.google.com/web/", type: "interactive" },
            ]
        }
    ],
    'Political Science': [
        {
            name: "Foundations of Political Science",
            resources: [
                { title: "Stanford Encyclopedia of Philosophy", description: "In-depth articles on political theories and philosophers.", url: "https://plato.stanford.edu/search/searcher.py?query=political", type: "article" },
                { title: "Crash Course: Government and Politics", description: "A video series explaining the fundamentals of US government and political systems.", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtOfse2ncvffeelTrqvhrz8H", type: "video" },
            ]
        }
    ]
};
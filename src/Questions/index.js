import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Questions = () => {
    const questionsList = [
        {
            question: 'What metrics are essential in term of Speed ?',
            answer: 'If we talk about the application\'s performance, then, first of all, there should not be an unpleasant feeling that this software "slows down". Because if users send reports about slow speed on the web resource, there is no reason to say something good about the performance. In this case, if it\'s possible, the application should be investigated and be refactored. So that such situation should be prevented during the development process, that\'s why there is a specific tab in the browser Inspector, which works precisely with performance. While writing code and debugging, we should check this tab to ensure that solution performance does not decrease. And of course, we need to look at such essential metrics, such as Time to First Byte (TTFB, the time between clicking on the link and the arrival of the first piece of content), First Rendering or First Paint (FP, the first time any pixel becomes visible to the user), First Content Rendering or First Contentful Paint (FCP, the time of the first display of the requested content) and Time To Interactivity (TTI, the point in time at which the page becomes interactive).',
        },
        {
            question: 'Can you name ways to increase speed (perceived or actual load time) ?',
            answer: 'There are many ways to increase performance (or to hide some long-term processes from the user).\n' +
                'First of all, it\'s a Server-Side Rendering (SSR), which allows running Frontend code on the server (and not in the browser as usual) and sending the finished result to the user, avoiding unnecessary load on his browser and computer. And this is pretty obvious because the browser "eats" a lot of RAM anyway. And if we shift all server calculations to the user\'s browser, then the load on his system increases.\n' +
                'The second way - is by using cache. Many large data sets can be present in the application. At the same time, these sets don\'t have frequent breaking changes. It means that we can store this data in the cache and reuse it to prevent unnecessary updates while rendering components.\n' +
                'Sometimes we can\'t skip some long-term processes. That\'s why we are making them not so perceptible. We can use loaders to hide pauses, use steppers to split some massive actions on less. In my opinion, we can also consider all this stuff as ways to increase performance.',
        },
        {
            question: 'Could you tell me what are SSR, pre-rendering and Dynamic rendering ?',
            answer: 'I\'ve explained a bit of SSR and CSR in answer to the second question. But there also can be pre-rendering or dynamic rendering. The idea of these two types of rendering is to have different application behavior depending on what User-Agent is using it. The application works with all scripts and actions if it is a regular user. But if User-Agent is a search bot (for example, Google bot), which uses a "blind" browser (search and index HTML elements), these types of rendering are returning static pages which easily can be indexed. This is very useful for the development of the SEO-solutions.',
        },
        {
            question: 'You have a bug to fix, you find the file(s) where the bug occurs, the code is a mess, what do you do ?',
            answer: 'Bug fixing is not an obvious process and doesn\'t have strict rules. But there can be some good practices that are helpful in most cases. It\'s a good idea to decide to localize the problem. As a result, we should understand the exact place in the application where the issue manifests itself. The next step depends on a bug. We just need to fix the problem and test our solution if the problem is explicit. Otherwise - we need to debug the founded part of the code. While we watch through the code execution step by step, bugs can show themselves, and it will be an excellent chance to solve them. On the other side, problems can be complex and result from architectural mistakes. This case needs a conversation between the participants of the development team and sometimes with the business team. Also, there can be issues caused by errors in some third-party solutions or dependency packages. In this case, we can fork this third-party if we have time or send the subject request to the support. The choice depends on the time we have to solve the problem and its priority.',
        },
        {
            question: 'What represent FrontEnd to you ?',
            answer: 'Personally, Frontend is a part of the development process with a big responsibility. All features produced on the Frontend side are visible and interactive for the end-user. That\'s why a bad-quality solution can bring a lot of troubles to the business. But on the other side Frontend has a perfect advantage - you can see your result of work, you can touch and enjoy it. And there are many exciting tasks and solutions that can be provided or included in the project - so it\'s an exactly not dull activity.',
        },
        {
            question: 'What was the last technical challenge you faced and how you did you handle it ?',
            answer: 'The freshest and the most exciting technical challenge was connected with the investigation, decision, and solution implementation, which should automatically synchronize data from GraphQL API, SSE (Symfony API Platform Mercure), and the state manager (Redux).\n' +
                'It was a paired task - for me and for the backend developer. First of all, we unified the response structure from API and SSE and made validation on the client-side. All the entities that were connected to SSE had connections not through the common topic. Every entity instance in the state manager was connected with the SSE engine on its own. That\'s why we filtered unused messages from SSE and significantly increased performance. So that, state manager became "the one source of truth" and rerenders of the components didn\'t happen very often. All this stuff was done during 3-4 days.',
        },
        {
            question: 'What is the next language/framework/stack you want to learn this year and why ?',
            answer: 'I want to raise my skills in Nextjs. So that I was searching for a position that included this framework in the technical stack. The reason is simple - according to my experience, Nextjs is the very perspective framework for guys like me who studied React but want more. I\'ve started using it before in a previous project and was satisfied.',
        },
    ]

    return <Box>
        {questionsList.map((item, index) => <Accordion key={`answer-${index}`}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography color='text.secondary'>{item.answer}</Typography>
            </AccordionDetails>
        </Accordion>)}
    </Box>
}
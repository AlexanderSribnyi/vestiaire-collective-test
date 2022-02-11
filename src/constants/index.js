import {Development} from "../Development";
import {Extra} from "../Extra";
import {Questions} from "../Questions";

export const tasksList = [
    {
        name: 'Development',
        component: () => <Development/>,
    },
    {
        name: 'Questions',
        component: () => <Questions/>,
    },
    {
        name: 'Extra',
        component: () => <Extra/>,
    },
];

export const developmentConditions = [
    {
        description: 'User is coming from an Off-White promotion offer link, display only the Off-White\'s products with a reduced price of 10%.',
        condition: item => item.brand === 'Off-White',
        mutate: item => {
            // Reducing price of 10%
            const reducedPrice = item.price.price_in_cents - Math.trunc(item.price.price_in_cents / 10)
            return {
                ...item,
                price: {
                    ...item.price,
                    price_in_cents: reducedPrice,
                    price: `${reducedPrice/100}${item.price.currency}`,
                }
            }
        },
    },
    {
        description: 'Louis Vuitton doesn\'t want us to display the name of their brand on our website, could you reverse the name of the brand for each LV product to obfuscate their name ?',
        mutate: item => ({
            ...item,
            ...(item.brand === 'Louis Vuitton' && {
                brand: item.brand.split('').reverse().join('')
            })
        }),
    },
    {
        description: 'I\'m a user from UK and I want to see product between 1500€ and 500€, ordered from the cheaper to the most expensive that are shippable to my country.',
        condition: item => (
            item.price.price_in_cents >= 50000 &&
            item.price.price_in_cents <= 150000 &&
            item.shippable_countries.includes('UK')
        ),
        order: (a, b) => a.price.price_in_cents - b.price.price_in_cents,
    },
];
import { Poppins } from 'next/font/google';
const alphaFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '400', '500', '900'],
});

export const FONTS = {
    alpha: alphaFont,
};

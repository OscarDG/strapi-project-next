
import Link from "next/link";
import { STRAPI_BASE_URL } from "../lib/strapi";
import Image from "next/image";

export function HeroSection({data}: { readonly data: {heading: string, subheading: string, 
    link: { href: string, label:string}, 
    image: { url: string, alternativeText: string}}}) {
        
    if(!data) return null;

    const { heading, subheading, link } = data;

    console.dir(data, {depth: null});

    const imageURL = data.image?.url.startsWith('http') ? data.image.url : `${STRAPI_BASE_URL}${data.image?.url}`; 
    
    return (
        <header className="bg-blue-600 text-white py-12">
            <Image alt={data.image?.alternativeText || "No text"}
                className=""
                height={1080}
                src={imageURL}
                style={{aspectRatio: "1920/1080",
                objectFit: "cover",
                }}
                width={1920}
                unoptimized
                />
            <div className="container mx-auto px-4 relative z-10">
                <h1>{heading}</h1>
                <p>{subheading}</p>
                <Link href={link.href}>
                    {link.label}
                </Link>
            </div>
        </header>
    )
}
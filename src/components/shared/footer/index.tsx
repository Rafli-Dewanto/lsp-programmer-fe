import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-medium text-pink-800">CakeVille</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Handcrafted cakes and pastries for every occasion. Made with love since 2010.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-pink-800">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-pink-800">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-pink-800">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-pink-800">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-pink-800">
                  All Cakes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-pink-800">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-pink-800">
                  Wedding Cakes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-pink-800">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-pink-800">
                  Cupcakes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-pink-800">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-pink-800">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-pink-800">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>123 Bakery Street</p>
              <p>Cakeville, CA 90210</p>
              <p className="pt-2">
                <Link href="tel:+15551234567" className="hover:text-pink-800">
                  (555) 123-4567
                </Link>
              </p>
              <p>
                <Link href="mailto:hello@sweetdelights.com" className="hover:text-pink-800">
                  hello@sweetdelights.com
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CakeVille Bakery. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-pink-800">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-pink-800">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-pink-800">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
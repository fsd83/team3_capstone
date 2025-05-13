const footerManager = new WebsiteFooter({
    companyName: 'KampongShare', 
    copyrightYear: 2025, // Optional, defaults to current year
    additionalLinks: [
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Service', href: '/terms' }
    ],
    socialLinks: [
        { name: 'Facebook', href: 'https://facebook.com/kampongshare', icon: 'facebook' },
        { name: 'Twitter', href: 'https://twitter.com/kampongshare', icon: 'twitter' }
    ]
});

class EnhancedWebsiteFooter extends WebsiteFooter {
    // Add custom methods or override existing ones
    FooterContent() {
        const container = super.FooterContent();
        
        // Add a powered by section
        const poweredByDiv = document.createElement('div');
        poweredByDiv.className = 'powered-by text-muted small mt-2';
        poweredByDiv.textContent = 'Powered by Innovation';
        
        container.appendChild(poweredByDiv);
        return container;
    }

    // Add custom tracking or analytics
    initializeAnalytics() {
        // Example: Track footer link clicks
        const footerLinks = this.createFooter().querySelectorAll('a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Send analytics event
                this.trackFooterLinkClick(link.href);
            });
        });
    }

    trackFooterLinkClick(href) {
        // Implement your analytics tracking logic
        console.log('Footer link clicked:', href);
    }
}
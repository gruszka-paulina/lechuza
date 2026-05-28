const menuToggleBtn = document.getElementById('menu-toggle-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
const mobileLangBtn = document.getElementById('mobile-lang-btn');
const mobileLangChevron = mobileLangBtn
	? mobileLangBtn.querySelector('.bi-chevron-down')
	: null;

menuToggleBtn.addEventListener('click', () => {
	const isOpen = mobileMenu.classList.toggle('is-open');
	menuToggleBtn.classList.toggle('is-active', isOpen);

	if (!isOpen) {
		if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
		if (mobileLangChevron) mobileLangChevron.classList.remove('rotate-180');
	}
});

const mobileSubmenuToggles = document.querySelectorAll(
	'.mobile-submenu-toggle',
);
mobileSubmenuToggles.forEach((toggle) => {
	toggle.addEventListener('click', () => {
		const currentRow = toggle.parentElement;
		const associatedDropdown = currentRow.nextElementSibling;

		if (
			associatedDropdown &&
			associatedDropdown.classList.contains('dropdown-container')
		) {
			const isHidden = associatedDropdown.classList.toggle('hidden');
			const chevron = toggle.querySelector('.bi-chevron-down');
			if (chevron) {
				chevron.classList.toggle('rotate-180', !isHidden);
			}
		}
	});
});

if (mobileLangBtn && mobileLangDropdown) {
	mobileLangBtn.addEventListener('click', () => {
		const isHidden = mobileLangDropdown.classList.toggle('hidden');
		if (mobileLangChevron) {
			mobileLangChevron.classList.toggle('rotate-180', !isHidden);
		}
		if (!isHidden) {
			setTimeout(() => {
				mobileLangDropdown.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			}, 100);
		}
	});
}

const langBtn = document.getElementById('lang-btn');
const desktopLangDropdown = document.getElementById('desktop-lang-dropdown');
const langClose = document.getElementById('lang-close');
const langChevron = langBtn ? langBtn.querySelector('.bi-chevron-down') : null;

if (langBtn && desktopLangDropdown) {
	langBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		const isClosed = desktopLangDropdown.classList.toggle('hidden');
		if (langChevron) langChevron.classList.toggle('rotate-180', !isClosed);
	});
}

if (langClose && desktopLangDropdown) {
	langClose.addEventListener('click', () => {
		desktopLangDropdown.classList.add('hidden');
		if (langChevron) langChevron.classList.remove('rotate-180');
	});
}

document.addEventListener('click', (e) => {
	if (
		desktopLangDropdown &&
		langBtn &&
		!desktopLangDropdown.contains(e.target) &&
		!langBtn.contains(e.target)
	) {
		desktopLangDropdown.classList.add('hidden');
		if (langChevron) langChevron.classList.remove('rotate-180');
	}
});

const footerToggles = document.querySelectorAll('.footer-toggle');
footerToggles.forEach((toggle) => {
	toggle.addEventListener('click', function () {
		if (window.innerWidth < 1024) {
			const ulList = this.nextElementSibling;
			const chevron = this.querySelector('.bi-chevron-down');

			if (ulList) {
				if (
					ulList.style.display === 'flex' ||
					ulList.classList.contains('is-visible')
				) {
					ulList.style.display = 'none';
					ulList.classList.remove('is-visible');
				} else {
					ulList.style.display = 'flex';
					ulList.classList.add('is-visible');
				}
			}
			if (chevron) {
				chevron.classList.toggle('rotate-180');
			}
		}
	});
});

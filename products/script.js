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

document.querySelectorAll('.color-swatch').forEach((swatch) => {
	swatch.addEventListener('mouseenter', function () {
		const newSrc = this.getAttribute('data-variant-img');
		if (!newSrc) return;

		const card = this.closest('.product-card');
		const mainImg = card.querySelector('.main-product-image');

		if (mainImg) {
			mainImg.src = newSrc;

			if (mainImg.hasAttribute('data-src')) {
				mainImg.setAttribute('data-src', newSrc);
			}
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const compareContainer = document.getElementById('compare-container');
	if (!compareContainer) return;

	const slotElements = document.querySelectorAll('.compare-slot');
	const submitBtn = document.getElementById('compare-submit-btn');
	const clearAllBtn = document.getElementById('compare-clear-all');
	const checkboxes = document.querySelectorAll('.custom-checkbox');

	const MAX_ITEMS = 4;
	let selectedItems = [];

	function updateCompareUI() {
		if (selectedItems.length > 0) {
			compareContainer.classList.add('is-visible');
		} else {
			compareContainer.classList.remove('is-visible');
		}

		submitBtn.disabled =
			selectedItems.length < 2 || selectedItems.length > MAX_ITEMS;

		checkboxes.forEach((cb) => {
			cb.disabled = !cb.checked && selectedItems.length >= MAX_ITEMS;
		});

		slotElements.forEach((slot, index) => {
			const img = slot.querySelector('.slot-img');
			const btn = slot.querySelector('.remove-btn');
			const item = selectedItems[index];

			if (item) {
				img.src = item.imgSrc;
				slot.classList.remove('empty');
			} else {
				img.src = '';
				slot.classList.add('empty');
			}
		});
	}
	function removeItem(index) {
		if (selectedItems[index]) {
			selectedItems[index].checkboxRef.checked = false;
			selectedItems.splice(index, 1);
			updateCompareUI();
		}
	}

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', (e) => {
			const card = e.target.closest('.product-card');
			if (!card) return;

			const productId =
				card.getAttribute('data-id') ||
				card.querySelector('a')?.innerText;
			const imgSrc =
				card.getAttribute('data-img') ||
				card.querySelector('.main-product-image')?.src;

			if (e.target.checked) {
				if (selectedItems.length < MAX_ITEMS) {
					selectedItems.push({
						id: productId,
						imgSrc,
						checkboxRef: e.target,
					});
				}
			} else {
				selectedItems = selectedItems.filter(
					(item) => item.checkboxRef !== e.target,
				);
			}

			updateCompareUI();
		});
	});

	slotElements.forEach((slot, index) => {
		const btn = slot.querySelector('.remove-btn');
		btn.addEventListener('click', () => {
			if (selectedItems[index]) {
				removeItem(index);
			}
		});
	});

	clearAllBtn.addEventListener('click', () => {
		selectedItems.forEach((item) => (item.checkboxRef.checked = false));
		selectedItems = [];
		updateCompareUI();
		compareContainer.classList.remove('is-visible');
	});
});

const filterButtons = document.querySelectorAll('.filter-tab-btn');
const filterPanels = document.querySelectorAll('.filter-panel');

function closeAllFilters() {
	filterPanels.forEach((panel) => panel.classList.add('hidden'));
	filterButtons.forEach((btn) => {
		btn.classList.remove('is-active');
		const group = btn.closest('.filter-group');
		if (group) group.classList.remove('is-open');
	});
}

filterButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const targetId = button.getAttribute('data-filter-target');
		const targetPanel = document.getElementById(targetId);
		const group = button.closest('.filter-group');

		const isAlreadyOpen = !targetPanel.classList.contains('hidden');

		closeAllFilters();

		if (!isAlreadyOpen) {
			targetPanel.classList.remove('hidden');
			button.classList.add('is-active');
			if (group) group.classList.add('is-open');
		}
	});
});

document.querySelectorAll('.filter-close-btn').forEach((closeBtn) => {
	closeBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		closeAllFilters();
	});
});

document
	.getElementById('mobile-filter-trigger')
	.addEventListener('click', (e) => {
		const container = document.getElementById('filter-container');
		container.classList.toggle('is-open');

		const chevron = e.currentTarget.querySelector('.bi-chevron-down');
		if (chevron) {
			chevron.classList.toggle('rotate-180');
		}
	});

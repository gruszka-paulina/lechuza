document.addEventListener('DOMContentLoaded', () => {
	const menuToggleBtn = document.getElementById('menu-toggle-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
	const mobileLangBtn = document.getElementById('mobile-lang-btn');
	const mobileLangChevron = mobileLangBtn
		? mobileLangBtn.querySelector('.bi-chevron-down')
		: null;

	if (menuToggleBtn && mobileMenu) {
		menuToggleBtn.addEventListener('click', () => {
			const isOpen = mobileMenu.classList.toggle('is-open');
			menuToggleBtn.classList.toggle('is-active', isOpen);

			if (!isOpen) {
				if (mobileLangDropdown)
					mobileLangDropdown.classList.add('hidden');
				if (mobileLangChevron)
					mobileLangChevron.classList.remove('rotate-180');
			}
		});
	}

	const mobileSubmenuToggles = document.querySelectorAll(
		'.mobile-submenu-toggle',
	);
	mobileSubmenuToggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const currentRow = toggle.parentElement;
			const associatedDropdown = currentRow
				? currentRow.nextElementSibling
				: null;

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
	const desktopLangDropdown = document.getElementById(
		'desktop-lang-dropdown',
	);
	const langClose = document.getElementById('lang-close');
	const langChevron = langBtn
		? langBtn.querySelector('.bi-chevron-down')
		: null;

	if (langBtn && desktopLangDropdown) {
		langBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			const isClosed = desktopLangDropdown.classList.toggle('hidden');
			if (langChevron)
				langChevron.classList.toggle('rotate-180', !isClosed);
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

	document.querySelectorAll('.js-product-card').forEach((card) => {
		const slideTrack = card.querySelector('.js-slide-track');
		const firstImage = card.querySelector('.js-main-image');
		const prevBtn = card.querySelector('.js-prev-btn');
		const nextBtn = card.querySelector('.js-next-btn');
		const thumbnails = card.querySelectorAll('.js-thumb');
		const swatches = card.querySelectorAll('.color-swatch');
		const thumbContainer = card.querySelector('.js-thumb-container');
		const thumbPrevBtn = card.querySelector('.js-thumb-prev');
		const thumbNextBtn = card.querySelector('.js-thumb-next');

		if (!slideTrack || !firstImage || !thumbnails.length) return;

		const activeStyleString = thumbnails[0].className;
		const inactiveStyleString = thumbnails[1]
			? thumbnails[1].className
			: thumbnails[0].className;

		thumbnails.forEach((thumb, index) => {
			if (index === 0) return;
			const largeSrc = thumb.getAttribute('data-large-src');
			if (largeSrc) {
				const newImg = firstImage.cloneNode(true);
				newImg.src = largeSrc;
				newImg.setAttribute('data-src', largeSrc);
				slideTrack.appendChild(newImg);
			}
		});

		let currentIndex = 0;
		const totalImages = thumbnails.length;

		const updateCarousel = (index) => {
			currentIndex = index;
			slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

			thumbnails.forEach((thumb, i) => {
				thumb.className =
					i === currentIndex
						? activeStyleString
						: inactiveStyleString;
			});

			if (thumbContainer) {
				const activeThumb = thumbnails[currentIndex];
				const containerWidth = thumbContainer.offsetWidth;
				const thumbLeft = activeThumb.offsetLeft;
				const thumbWidth = activeThumb.offsetWidth;
				thumbContainer.scroll({
					left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
					behavior: 'smooth',
				});
			}
		};

		prevBtn?.addEventListener('click', () => {
			updateCarousel((currentIndex - 1 + totalImages) % totalImages);
		});

		nextBtn?.addEventListener('click', () => {
			updateCarousel((currentIndex + 1) % totalImages);
		});

		thumbnails.forEach((thumb, index) => {
			thumb.addEventListener('click', () => updateCarousel(index));
		});

		thumbPrevBtn?.addEventListener('click', () => {
			updateCarousel((currentIndex - 1 + totalImages) % totalImages);
		});

		thumbNextBtn?.addEventListener('click', () => {
			updateCarousel((currentIndex + 1) % totalImages);
		});

		swatches.forEach((swatch) => {
			swatch.addEventListener('mouseenter', function () {
				const variantSrc = this.getAttribute('data-variant-img');
				if (!variantSrc) return;
				updateCarousel(0);
				firstImage.src = variantSrc;
				firstImage.setAttribute('data-src', variantSrc);
			});
		});
	});

	document.querySelectorAll('.js-accordion-toggle').forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const item = toggle.closest('.js-accordion-item');
			if (!item) return;

			const content = item.querySelector('.js-accordion-content');
			const chevron = toggle.querySelector('.bi-chevron-down');

			if (content) {
				const isHidden = content.classList.toggle('hidden');
				if (chevron) {
					chevron.classList.toggle('rotate-180', !isHidden);
				}
			}
		});
	});

	document
		.querySelectorAll('.js-accessories-carousel')
		.forEach((carousel) => {
			const track = carousel.querySelector('.js-accessories-track');
			const prevBtn = carousel.querySelector('.js-acc-prev');
			const nextBtn = carousel.querySelector('.js-acc-next');
			const items = carousel.querySelectorAll(
				'.js-accessories-track > div',
			);

			if (!track || !items.length) return;

			let currentIndex = 0;

			const updateSlider = () => {
				const itemsPerView = window.innerWidth < 768 ? 1 : 3;
				const maxIndex = Math.max(0, items.length - itemsPerView);

				if (currentIndex > maxIndex) currentIndex = maxIndex;

				const stepWidth = 100 / itemsPerView;
				track.style.transform = `translateX(-${currentIndex * stepWidth}%)`;

				if (prevBtn)
					prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
				if (nextBtn)
					nextBtn.style.opacity =
						currentIndex === maxIndex ? '0.3' : '1';
			};

			prevBtn?.addEventListener('click', () => {
				if (currentIndex > 0) {
					currentIndex--;
					updateSlider();
				}
			});

			nextBtn?.addEventListener('click', () => {
				const itemsPerView = window.innerWidth < 768 ? 1 : 3;
				if (currentIndex < items.length - itemsPerView) {
					currentIndex++;
					updateSlider();
				}
			});

			updateSlider();
			window.addEventListener('resize', updateSlider);
		});
});
